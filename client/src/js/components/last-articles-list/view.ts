'use strict'
import IArticle from '../interfaces/IArticle';

class View {

  appendLastArticlesList(lastArticlesList: IArticle[]) {

    if (lastArticlesList === null || lastArticlesList === undefined) {
      return /* html */`
        <div class="container mx-auto px-4 sm:px-8 font-sans text-base antialiased leading-7 z-0 ml-5">
          <article>
            <h1 class="text-3xl font-normal leading-normal mb-2">Articles:</h1>
            <ul>
              <li class="font-medium text-blue-400 hover:font-bold">
                <a href="/Error502">No articles available</a>
              </li>
            </ul>
          </article>
        </div>
      `;
    }

    const list: any[] = [];
    Object.entries(lastArticlesList).forEach(([, value]) => {
      (value as unknown as any[]).forEach((article: any) => list.push(article));
    });

    // sort descending by date
    list.sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Folgeartikel-Lookup: cluster → followers (order > 0)
    const clusterFollowers = new Map<string, any[]>();
    list.forEach((article: any) => {
      if (article.cluster && Number(article.order) > 0) {
        if (!clusterFollowers.has(article.cluster))
          clusterFollowers.set(article.cluster, []);
        clusterFollowers.get(article.cluster)!.push(article);
      }
    });
    clusterFollowers.forEach((arts) =>
      arts.sort((a: any, b: any) => Number(a.order) - Number(b.order))
    );

    // Nur Follower heraushalten deren Hauptartikel (order=0) im Ergebnis ist
    const followerSlugs = new Set<string>();
    clusterFollowers.forEach((arts, clusterId) => {
      const hasEntry = list.some(
        (a: any) => a.cluster === clusterId && Number(a.order) === 0
      );
      if (hasEntry) {
        arts.forEach((a: any) => followerSlugs.add(a.slug));
      }
    });

    const entryArticles = list.filter((a: any) => !followerSlugs.has(a.slug));

    const renderArticle = (article: any, showTags: boolean): string => {
      const isEntry    = !article.cluster || Number(article.order) === 0;
      const hasCluster = !!article.cluster;
      return `
        <li class="flex items-center gap-3 font-medium hover:text-blue-400 py-2">
          <span class="w-5 h-5 flex items-center justify-center rounded-full text-[10px]
                       font-mono flex-shrink-0
                       ${isEntry && hasCluster
                         ? 'bg-orange-300 dark:bg-orange-400 text-white'
                         : isEntry
                           ? 'border border-slate-200 dark:border-slate-700 text-slate-300'
                           : 'border border-slate-300 dark:border-slate-400 text-slate-400'}">
            ${isEntry ? '★' : article.order}
          </span>

          <a class="flex-1"
             key="${article.slug}"
             navigateLinkTo="/article/${article.slug}"
             href="/article/${article.slug}">
            ${article.title.substring(1, article.title.length - 1)}
          </a>

          ${showTags && article.tags ? `
            <span class="inline-flex flex-wrap gap-1 items-center">
              ${article.tags.split(' ').map((tag: any) =>
                `<a navigateLinkTo="/tag/${tag}" href="/tag/${tag}"
                    class="text-[11px] font-mono border border-slate-300 dark:border-slate-600
                           text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full
                           hover:border-blue-400 hover:text-blue-500">#${tag}</a>`
              ).join('')}
              <span class="invisible sm:visible text-[11px] font-mono border border-slate-200
                           dark:border-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
                ${article.date}
              </span>
            </span>
          ` : ''}
        </li>
      `;
    };

    const view = /* html */`
      <div class="mx-5 font-sans text-base antialiased leading-7 z-0">
        <article>
          <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
            <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Latest Posts</p>
          </div>
          <ul>
            ${entryArticles.map((entry: any) => {
              const isOrphan  = Number(entry.order) > 0;
              const followers = !isOrphan && entry.cluster
                ? (clusterFollowers.get(entry.cluster) ?? [])
                : [];
              return `
                ${renderArticle(entry, true)}
                ${followers.length > 0 ? `
                  <div class="ml-7 border-l border-slate-200 dark:border-slate-700 pl-3">
                    <ul>
                      ${followers.map((f: any) => renderArticle(f, false)).join('')}
                    </ul>
                  </div>
                ` : ''}
              `;
            }).join('')}
          </ul>
        </article>
      </div>
    `;
    return view;
  }
}

export default View;