// Testing loader component
// ✓ should return a loader element

import Loader from './index'
import View from './view'
import Model from './model'

describe('Test the component Loader', () => {

    let loader: Loader
    let view: View
    let model: Model

    beforeEach(() => {
        model = new Model()
        view = new View()
        loader = new Loader()
    })

    // Test to check if the component can create an instance of the class
    it('Loader Component should create an instance of the class', () => {
        expect(loader).toBeInstanceOf(Loader)
    })

    // Test to check if the loader component returns a loader element
    it('Loader Component should return a loader element', async () => {
        const loaderElement = await loader.render()
        expect(loaderElement).toBeDefined()
    })
})