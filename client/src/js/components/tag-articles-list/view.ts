'use strict'

class View {

  appendTagArticlesList(articlesList: { spec: string }) {

    const emptyState = /* html */`
      <div class="mx-10 font-sans text-base antialiased leading-7 z-0">
        <article>
          <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
            <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">No writings found</p>
          </div>
        </article>
      </div>
    `;

    if (!articlesList) return emptyState;

    const list: any[] = [];
    Object.entries(articlesList).forEach(([, value]) => {
      (value as unknown as any[]).forEach((article: any) => list.push(article));
    });

    if (list.length === 0) return emptyState;

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
    // Verwaiste Follower bleiben sichtbar als eigenständige Entries
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

    const MONTHS_EN = [
      'January','February','March','April','May','June',
      'July','August','September','Oktober','November','December'
    ];

    type MonthGroup = { month: number; articles: any[] };
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
            </span>
          ` : ''}
        </li>
      `;
    };

    const view = /* html */`
      <div class="mx-10 font-sans text-base antialiased leading-7 z-0">
        <article>
          <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
            <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">Found</p>
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