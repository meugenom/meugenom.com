'use strict'

/**
 * View for component Layout
 * @param posts
 * @returns html view for layout page
 */

class View {
  
  async getLayoutHTMLElement () {
    
    // add layout html nodes
    let layoutAboveHTMLElement = document.createElement('div');
    layoutAboveHTMLElement.setAttribute('id', 'layout');
    layoutAboveHTMLElement.setAttribute('class', 'h-full');

    let layoutMiddleHTMLElement = document.createElement('div');
    layoutMiddleHTMLElement.setAttribute('class', 'flex justify-center items-start h-full');

    let layoutBelowHTMLElement = document.createElement('div');
    layoutBelowHTMLElement.setAttribute('class','container max-w-screen-2xl flex flex-col sm:flex-row h-full');

    // left side bar — empty and hidden by default, ToC is injected by Article controller
    let SideBarLeftHTMLElement = document.createElement('div');
    SideBarLeftHTMLElement.setAttribute('id', 'side-bar-left');
    SideBarLeftHTMLElement.setAttribute('class', 'flex-shrink-0');

    // main content
    let PageHTMLElement = document.createElement('div');
    PageHTMLElement.setAttribute('id', 'page');
    PageHTMLElement.setAttribute('class', 'flex-1 min-w-0 overflow-y-auto overflow-x-auto border-r border-gray-300 mb-0 pb-10');

    // right side bar
    let SideBarRightHTMLElement = document.createElement('div');
    SideBarRightHTMLElement.setAttribute('id', 'side-bar-right');
    SideBarRightHTMLElement.setAttribute('class', 'hidden lg:flex flex-col flex-shrink-0 w-[25%] max-w-[25%] overflow-y-auto');
    
    // append layout html nodes
    await layoutBelowHTMLElement.appendChild(SideBarLeftHTMLElement);
    await layoutBelowHTMLElement.appendChild(PageHTMLElement);
    await layoutBelowHTMLElement.appendChild(SideBarRightHTMLElement);

    await layoutMiddleHTMLElement.appendChild(layoutBelowHTMLElement);
    await layoutAboveHTMLElement.appendChild(layoutMiddleHTMLElement);


    //console.log(layoutAboveHTMLElement);

    return layoutAboveHTMLElement;
  }

}

export default View