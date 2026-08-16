import Router from "./router";
import Navbar from "../components/nav";
import Layout from "../components/layout";
import SideBarRight from "../components/side-bar-right";
import Footer from "../components/footer";
import Error404 from "../components/error404";
import Error502 from "../components/error502";
import Utils from "../components/services/utils";
import Config from "../config";

// Mock dependenciess
jest.mock("../components/nav");
jest.mock("../components/layout");
jest.mock("../components/side-bar-right");
jest.mock("../components/footer");
jest.mock("../components/error404");
jest.mock("../components/error502");
jest.mock("../components/services/utils");

describe("Router", () => {
  let mockHomeRoute: { render: jest.Mock; afterRender: jest.Mock };
  let mockArticleRoute: { render: jest.Mock; afterRender: jest.Mock };
  let routes: Record<string, any>;

  beforeEach(() => {
    // Reset singleton instance between tests
    (Router as any).instance = null;

    // Reset DOM structure
    document.body.innerHTML = `
            <meta name="description" content="" />
            <div id="header"></div>
            <div id="content"></div>
            <div id="footer"></div>
        `;

    // Reset history location
    window.history.pushState({}, "", "/");

    // Setup route mocks
    mockHomeRoute = {
      render: jest
        .fn()
        .mockResolvedValue('<div id="home-view">Home Content</div>'),
      afterRender: jest.fn().mockResolvedValue(undefined),
    };

    mockArticleRoute = {
      render: jest
        .fn()
        .mockResolvedValue('<div id="article-view">Article Content</div>'),
      afterRender: jest.fn().mockResolvedValue(undefined),
    };

    routes = {
      "/": mockHomeRoute,
      "/article/:id": mockArticleRoute,
    };

    // Mock Navbar component
    (Navbar.prototype.render as jest.Mock).mockResolvedValue(
      '<nav id="navbar">Nav</nav>',
    );
    (Navbar.prototype.afterRender as jest.Mock).mockResolvedValue(undefined);

    // Mock Layout component & DOM elements
    const mockLayoutContainer = document.createElement("div");
    mockLayoutContainer.id = "layout";
    mockLayoutContainer.innerHTML = `
            <div id="side-bar-left"></div>
            <div id="page"></div>
            <div id="side-bar-right"></div>
        `;

    (Layout.prototype.getHTMLElement as jest.Mock).mockResolvedValue(
      mockLayoutContainer,
    );
    (SideBarRight.prototype.render as jest.Mock).mockResolvedValue(
      "<div>Sidebar Content</div>",
    );

    // Mock Footer component
    (Footer.prototype.render as jest.Mock).mockResolvedValue(
      "<footer>Footer</footer>",
    );
    (Footer.prototype.afterRender as jest.Mock).mockResolvedValue(undefined);

    // Mock Error components
    (Error404.prototype.render as jest.Mock).mockResolvedValue(
      '<div id="err404">404</div>',
    );
    (Error404.prototype.afterRender as jest.Mock).mockResolvedValue(undefined);

    (Error502.prototype.render as jest.Mock).mockResolvedValue(
      '<div id="err502">502</div>',
    );
    (Error502.prototype.afterRender as jest.Mock).mockResolvedValue(undefined);

    // Default mock for Utils URL parser
    (Utils.prototype.parseRequestURL as jest.Mock).mockReturnValue({
      resource: null,
      id: null,
      verb: null,
    });
  });

  describe("Initialization & Shell Rendering", () => {
    it("should render header, layout shell, page content, and footer on first load", async () => {
      const router = new Router(routes);

      // Wait for async init calls
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(Navbar.prototype.render).toHaveBeenCalled();
      expect(Layout.prototype.getHTMLElement).toHaveBeenCalled();
      expect(Footer.prototype.render).toHaveBeenCalled();

      const pageEl = document.getElementById("page");
      expect(pageEl?.innerHTML).toContain("Home Content");
      expect(document.title).toBe(Config.title);
    });

    it("should reuse static instance on subsequent Router creations and only re-render content", async () => {
      const firstRouter = new Router(routes);
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(Router.instance).toBe(firstRouter);

      // Second initialization
      new Router(routes);
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Header and Layout render should be called only once from the first initialization
      expect(Navbar.prototype.render).toHaveBeenCalledTimes(1);
      expect(Layout.prototype.getHTMLElement).toHaveBeenCalledTimes(1);
    });
  });

  describe("Route Resolution & Error Handling", () => {
    it("should render correct route based on parsed URL", async () => {
      (Utils.prototype.parseRequestURL as jest.Mock).mockReturnValue({
        resource: "article",
        id: "my-post",
        verb: null,
      });

      new Router(routes);
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockArticleRoute.render).toHaveBeenCalled();
      expect(mockArticleRoute.afterRender).toHaveBeenCalled();

      const pageEl = document.getElementById("page");
      expect(pageEl?.innerHTML).toContain("Article Content");
    });

    it("should fallback to Error404 when route does not exist", async () => {
      (Utils.prototype.parseRequestURL as jest.Mock).mockReturnValue({
        resource: "unknown-route",
        id: null,
        verb: null,
      });

      new Router(routes);
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(Error404.prototype.render).toHaveBeenCalled();
      expect(Error404.prototype.afterRender).toHaveBeenCalled();
    });

    it("should fallback to Error502 when page rendering throws an exception", async () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockHomeRoute.render.mockRejectedValue(new Error("Render Failure"));

      new Router(routes);
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(Error502.prototype.render).toHaveBeenCalled();
      expect(Error502.prototype.afterRender).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("should hide left sidebar on non-article pages", async () => {
      new Router(routes);
      await new Promise((resolve) => setTimeout(resolve, 0));

      const sidebarLeft = document.getElementById("side-bar-left");
      expect(sidebarLeft?.classList.contains("hidden")).toBe(true);
      expect(sidebarLeft?.classList.contains("lg:block")).toBe(false);
    });
  });

  describe("Navigation Interception & Active Links", () => {
    it("should intercept clicks on elements with navigateLinkTo attribute and update history", async () => {
      const pushStateSpy = jest.spyOn(window.history, "pushState");

      // Inject navigation link into page DOM
      mockHomeRoute.render.mockResolvedValue(`
                <div>
                    <a id="nav-btn" navigateLinkTo="/article/123">Read Article</a>
                </div>
            `);

      new Router(routes);
      await new Promise((resolve) => setTimeout(resolve, 0));

      const linkEl = document.getElementById("nav-btn") as HTMLElement;
      linkEl.click();

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(pushStateSpy).toHaveBeenCalledWith(
        {},
        "",
        expect.stringContaining("/article/123"),
      );
    });

    it("should apply active-links class to link matching current pathname", async () => {
      window.history.pushState({}, "", "/");

      mockHomeRoute.render.mockResolvedValue(`
                <a id="home-link" navigateLinkTo="/">Home</a>
                <a id="article-link" navigateLinkTo="/article/1">Article</a>
            `);

      new Router(routes);
      await new Promise((resolve) => setTimeout(resolve, 0));

      const homeLink = document.getElementById("home-link");
      const articleLink = document.getElementById("article-link");

      expect(homeLink?.classList.contains("active-links")).toBe(true);
      expect(articleLink?.classList.contains("active-links")).toBe(false);
    });
  });

  describe("Browser History Popstate", () => {
    it("should trigger re-render on window popstate event when pathname changes", async () => {
      new Router(routes);
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Change path and dispatch popstate
      window.history.pushState({}, "", "/article/123");
      (Utils.prototype.parseRequestURL as jest.Mock).mockReturnValue({
        resource: "article",
        id: "123",
        verb: null,
      });

      window.dispatchEvent(new PopStateEvent("popstate"));
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockArticleRoute.render).toHaveBeenCalled();
    });
  });
});
