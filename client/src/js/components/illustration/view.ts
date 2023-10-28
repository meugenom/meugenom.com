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
            
            <!-- screen splash -->
            <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                <div>

                    <img class="lazy object-center object-fill h-48 w-100" 
                        data-src="/images/screen_splash.svg" alt="screen splash">                    
                </div>
                <div class="text-center py-8 sm:py-6">
                    <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                        Screen Splash
                    </p>                        
                </div>
            </div>

                <!-- algo panda -->
                <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                    <div>
                        <img class="lazy object-center object-cover h-48 w-48" data-src="/images/algo_panda.png" alt="algo panda">
                    </div>
                    <div class="text-center py-8 sm:py-6">
                        <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                            Algorithms Panda
                        </p>                        
                    </div>
                </div>

                <!-- laptop panda -->
                <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                    <div>
                        <img class="lazy object-center object-cover h-48 w-48" data-src="/images/laptop_panda.png" alt="laptop panda">
                    </div>
                    <div class="text-center py-8 sm:py-6">
                        <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                            Laptop Panda
                        </p>                        
                    </div>
                </div>

                <!-- solutions panda -->
                <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                    <div>
                        <img class="lazy object-center object-cover h-48 w-48" data-src="/images/solution_panda.png" alt="solution-panda">
                    </div>
                    <div class="text-center py-8 sm:py-6">
                        <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                            Solutions Panda
                        </p>                        
                    </div>
                </div>

                <!-- meugenom panda -->
                <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                    <div>
                        <img class="lazy object-center object-fill h-48 w-48" data-src="/images/meugenom_panda.png" alt="meugenom panda">
                    </div>
                    <div class="text-center py-8 sm:py-6">
                        <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                            Meugenom Panda
                        </p>                        
                    </div>
                </div>

                <!-- brain gray -->
                <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                    <div>

                        <img class="lazy object-center object-fill h-48 w-48" 
                            data-src="/images/brain_gray.svg" alt="brain_gray">
                    
                    </div>
                    <div class="text-center py-8 sm:py-6">
                        <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                            Brain Gray
                        </p>                        
                    </div>
                </div>

                <!-- face splash -->
                <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                    <div>

                        <img class="lazy object-center object-fill h-48 w-48" 
                            data-src="/images/face-splash.svg" alt="face splash">                    
                    </div>
                    <div class="text-center py-8 sm:py-6">
                        <p class="text-md font-mono text-gray-500 leading-normal mb-2">
                            Face Splash
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