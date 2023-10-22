'use strict'

/**
 * View for component Home
 * @param posts
 * @returns html view for home page
 */

class View {

  async appendIllustration () {
        
    const view = await /* html */`    
    <div class="container mx-auto px-4 sm:px-8">
        <!-- component -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
            <h1 class="text-3xl font-normal leading-normal mt-0 mb-2 text-gray-500">
                Illustration
            </h1>
            <div class="text-center pb-12">                            
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                    <div>
                        <img class="object-center object-cover h-auto w-full" src="/images/algo-panda.png" alt="algo-panda">
                    </div>
                    <div class="text-center py-8 sm:py-6">
                        <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                            Algorithms Panda
                        </p>                        
                    </div>
                </div>

                <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                    <div>
                        <img class="object-center object-cover h-auto w-full" src="/images/laptop-panda.png" alt="laptop-panda">
                    </div>
                    <div class="text-center py-8 sm:py-6">
                        <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                            Laptop Panda
                        </p>                        
                    </div>
                </div>

                <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                    <div>
                        <img class="object-center object-cover h-auto w-full" src="/images/solution-panda.png" alt="solution-panda">
                    </div>
                    <div class="text-center py-8 sm:py-6">
                        <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                            Solutions Panda
                        </p>                        
                    </div>
                </div>

                <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                    <div>
                        <img class="object-center object-cover h-auto w-full" src="/images/website-panda.png" alt="website-panda">
                    </div>
                    <div class="text-center py-8 sm:py-6">
                        <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                            Meugenom Panda
                        </p>                        
                    </div>
                </div>

            </div>    
        </section>
        </div>
    `
    return view
  }
}

export default View