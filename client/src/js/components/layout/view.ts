'use strict'

import SideBarLeft from '../side-bar-left'

/**
 * View for component Layout
 * @param posts
 * @returns html view for layout page
 */

class View {

  sideBarLeftComponent: SideBarLeft;
  
  async getLayoutHTMLElement () {
    
    // add layout html nodes
    let layoutAboveHTMLElement = document.createElement('div');
    layoutAboveHTMLElement.setAttribute('id', 'layout');
    layoutAboveHTMLElement.setAttribute('class', 'h-screen');

    let layoutMiddleHTMLElement = document.createElement('div');
    layoutMiddleHTMLElement.setAttribute('class', 'flex justify-center items-center h-full');

    let layoutBelowHTMLElement = document.createElement('div');
    layoutBelowHTMLElement.setAttribute('class','container max-w-screen-2xl flex flex-col sm:flex-row h-full');

    // left side bar
    let SideBarLeftHTMLElement = document.createElement('div');
    SideBarLeftHTMLElement.setAttribute('id', 'side-bar-left');
    SideBarLeftHTMLElement.setAttribute('class', 'flex-shrink-0');
    // render side bar left
    this.sideBarLeftComponent = new SideBarLeft();
    const sideBarLeftInnerText = await this.sideBarLeftComponent.render()
    SideBarLeftHTMLElement.innerHTML = sideBarLeftInnerText;

    // main content
    let PageHTMLElement = document.createElement('div');
    PageHTMLElement.setAttribute('id', 'page');
    PageHTMLElement.setAttribute('class', 'w-full lg:w-4/6 min-w-[650px] overflow-y-auto overflow-x-auto border-r border-l border-gray-300');

    // right side bar
    let SideBarRightHTMLElement = document.createElement('div');
    SideBarRightHTMLElement.setAttribute('id', 'side-bar-right');
    SideBarRightHTMLElement.setAttribute('class', 'flex-shrink-0');
    
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