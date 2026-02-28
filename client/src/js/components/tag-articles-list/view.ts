'use strict'

/**
 * View for component Home
 * @param posts
 * @returns html view for articlesList by the tag page
 */

class View {

  appendTagArticlesList (articlesList: {spec: string}) {

    const list: string[] = [];

    // check if articlesList is empty
    if (!articlesList) {
      return /* html */`
        <div class="mx-10 font
        -sans text-base antialiased leading-7 z-0">
          <article>
            <div class="pt-6 pb-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
              <p class="text-[11px] font-bold uppercase tracking-widest opacity-50">No writings found</p>
            </div>
          </article>
        </div>
      `
    }

    // from object to array
    Object.entries(articlesList).forEach(([key, value]) => {      
      (value as unknown as any[]).map((article: any) => {        
        list.push(article)
      })
    })

    // sort descending by date
    list.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const MONTHS_DE = [
      'Januar','Februar','März','April','Mai','Juni',
      'Juli','August','September','Oktober','November','Dezember'
    ];

    type MonthGroup = { month: number; articles: any[] };
    type YearGroup  = { year: number; months: MonthGroup[] };
    const groups: YearGroup[] = [];
    list.forEach((article: any) => {
      const d     = new Date(article.date);
      const year  = d.getFullYear();
      const month = d.getMonth();
      let yg = groups.find(g => g.year === year);
      if (!yg) { yg = { year, months: [] }; groups.push(yg); }
      let mg = yg.months.find(m => m.month === month);
      if (!mg) { mg = { month, articles: [] }; yg.months.push(mg); }
      mg.articles.push(article);
    });

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
                    <p class="text-[11px] font-bold uppercase tracking-widest opacity-50 mb-1">${MONTHS_DE[mg.month]}</p>
                    <ul>
                      ${mg.articles.map((article: any) => `
                        <li class="font-medium hover:text-blue-400 py-2">
                          <a href="#/article/${article.slug}">
                            ${article.title.substring(1, article.title.length - 1)}
                          </a>
                          &nbsp;
                          <span class="inline-flex flex-wrap gap-1 items-center">
                            ${article.tags.split(" ").map((tag: any) =>
                              `<a href="#/tag/${tag}" class="text-[11px] font-mono border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full hover:border-blue-400 hover:text-blue-500">#${tag}</a>`
                            ).join('')}
                          </span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
            `).join('')}

        </article>
    </div>
    `
    return view
  }
}

export default View
