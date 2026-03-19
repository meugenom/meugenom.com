'use strict'
import IArticle from '../interfaces/IArticle';

class View {

  async appendArticlesList(articlesList: IArticle[]) {

    const list: IArticle[] = [];

    if (articlesList === null || articlesList === undefined) {
      return /* html */`
        <div class="container mx-auto px-4 sm:px-8 font-sans text-base antialiased leading-7 z-0 ml-5">
          <article>
            <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
              <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Articles</p>
            </div>
            <ul>
              <li class="text-blue-400 hover:text-blue-400">
                <a href="/Error502">No articles available</a>
              </li>
            </ul>
          </article>
        </div>
      `;
    }

    // from object to array
    Object.entries(articlesList).forEach(([key, value]) => {
      (value as unknown as any[]).map((article: any) => {
        list.push(article);
      });
    });

    // Alle Artikel nach cluster gruppieren (für späteren Lookup)
    // key = clusterId, value = alle Folgeartikel (order > 0), sortiert
    const clusterFollowers = new Map<string, IArticle[]>();
    list.forEach((article: any) => {
      if (Number(article.order) > 0) {
        if (!clusterFollowers.has(article.cluster)) {
          clusterFollowers.set(article.cluster, []);
        }
        clusterFollowers.get(article.cluster)!.push(article);
      }
    });
    // Folgeartikel innerhalb jedes Clusters nach order sortieren
    clusterFollowers.forEach((arts) => {
      arts.sort((a: any, b: any) => Number(a.order) - Number(b.order));
    });

    // Nur Hauptartikel (order === 0) in die Year/Month-Struktur
    const entryArticles = list.filter((a: any) => Number(a.order) === 0);
    entryArticles.sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const MONTHS_EN = [
      'January','February','March','April','May','June',
      'July','August','September','Oktober','November','December'
    ];

    type MonthGroup = { month: number; articles: IArticle[] };
    type YearGroup  = { year: number; months: MonthGroup[] };
    const groups: YearGroup[] = [];

    entryArticles.forEach((article: any) => {
      const d     = new Date(article.date);
      const year  = d.getFullYear();
      const month = d.getMonth();
      let yg = groups.find(g => g.year === year);
      if (!yg) { yg = { year, months: [] }; groups.push(yg); }
      let mg = yg.months.find(m => m.month === month);
      if (!mg) { mg = { month, articles: [] }; yg.months.push(mg); }
      mg.articles.push(article);
    });

    const renderArticle = (article: any, showTags: boolean): string => {
      const isEntry = Number(article.order) === 0;
      return `
        <li class="flex items-center gap-3 font-medium hover:text-blue-400 py-2">
          <span class="w-5 h-5 flex items-center justify-center rounded-full text-[10px]
                       font-mono flex-shrink-0
                       ${isEntry
                         ? 'bg-orange-300 dark:bg-orange-400 text-white'
                         : 'border border-slate-300 dark:border-slate-400 text-slate-400'}">
            ${isEntry ? '★' : article.order}
          </span>

          <a class="flex-1"
             key="${article.slug}"
             navigateLinkTo="/article/${article.slug}"
             href="/article/${article.slug}">
            ${article.title.substring(1, article.title.length - 1)}
          </a>

          ${showTags ? `
            <span class="inline-flex flex-wrap gap-1 items-center">
              ${article.tags.split(' ').map((tag: any) =>
                `<a navigateLinkTo="/tag/${tag}" href="/tag/${tag}"
                    class="text-[11px] font-mono border border-slate-300 dark:border-slate-600
                           text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full
                           hover:border-blue-400 hover:text-blue-500">${tag}</a>`
              ).join('')}
            </span>
          ` : ''}
        </li>
      `;
    };

    const view = /* html */`
      <div class="container mx-auto px-4 sm:px-8 font-sans text-base antialiased leading-7 z-0 ml-5">
        <article>
          <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
            <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Articles</p>
          </div>

          ${groups.map((yg: YearGroup) => `
            <div class="mt-6">
              <p class="text-[11px] font-bold uppercase tracking-widest opacity-50 mb-2">${yg.year}</p>

              ${yg.months.map((mg: MonthGroup) => `
                <div class="ml-4 mb-3">
                  <p class="text-[11px] font-bold uppercase tracking-widest opacity-50 mb-1">
                    ${MONTHS_EN[mg.month]}
                  </p>
                  <ul>
                    ${mg.articles.map((entry: any) => {
                      const followers = clusterFollowers.get(entry.cluster) ?? [];
                      const isSeries  = followers.length > 0;
                      return `
                        <!-- Hauptartikel -->
                        ${renderArticle(entry, true)}
                        <!-- Folgeartikel direkt darunter, unabhängig vom Datum -->
                        ${isSeries
                          ? `<div class="ml-7 border-l border-slate-200 dark:border-slate-700 pl-3">
                               <ul>
                                 ${followers.map((f: any) => renderArticle(f, false)).join('')}
                               </ul>
                             </div>`
                          : ''}
                      `;
                    }).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          `).join('')}

        </article>
      </div>
    `;
    return view;
  }
}

export default View;