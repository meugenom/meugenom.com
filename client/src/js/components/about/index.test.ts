// Desc: Test file for About component

import View from './view'
import About from './index'
import Model from './model'
import * as fs from 'fs';


describe('Test the component About', () => {

    let about: About
    let view: View
    let model: Model

    beforeEach(() => {
        model = new Model()
        view = new View()
        about = new About()
    })

    // Test to check if the component can create an instance of the class
    it('About Component should create an instance of the class', () => {
        expect(about).toBeInstanceOf(About)
    })

    // Test to check closed html tags in the view
    it('About View should have closed html tags', async () => {
        // need to create stack to check if tags are closed
        const stack: string[] = []
        const html = await view.appendAbout()
        // get all tags from the html and exclude '<!-- some text -->' and img tags
        const tags = ((await html).match(/<[^>]*>/g)?.filter(tag => !tag.match(/<!--.*-->/) && !tag.match(/<img.*>/)))

        if (!tags) {
            return
        }

        tags.map(tag => {
            if (tag.match(/^<\//)) {
                stack.pop()
            } else if (!tag.match(/\/>$/)) {
                stack.push(tag)
            }
        })

        // if stack is empty, all tags are closed
        expect(stack.length).toEqual(0);
    })

    // Test to check images in the view
    it('About View should have images', async () => {
        const html = await view.appendAbout()
        const images = html.match(/<img.*>/g)

        //get links from images and check if they are valid
        if (images) {
            const loadPromises = images.map(image => {
                return new Promise<void>((resolve, reject) => {
                    // get data-src from simple <img class="lazy w-full h-auto object-cover" data-src="/images/foto_me.jpg" alt="Me"/> src path
                    const pathMatch = image.match(/data-src="([^"]*)"/)

                    if (pathMatch && pathMatch[1] && pathMatch[1].length > 0) {
                        //console.log(pathMatch[1])
                        
                        // cut the last three elements from the path
                        //console.log(__dirname)
                        const dirs = __dirname.split('/')
                        //console.dir(dirs)
                        dirs.pop()
                        dirs.pop()
                        dirs.pop()
                        //console.dir(dirs)
                        // join all elements to get the path
                        let filePath = dirs.join('/')
                        //console.log(filePath)
                        filePath = filePath + `/static`+ pathMatch[1]
                        //console.log(filePath)

                        try {
                            const data = fs.readFileSync(filePath, 'utf8');
                            if (data) {
                                console.log('The file exists.')
                                resolve()
                            }
                          } catch (err) {
                            console.error(err);
                          }

                    } else {
                        resolve()
                    }
                })
            })
            await Promise.all(loadPromises)
        }

        expect(images).not.toBeNull()
    })
})