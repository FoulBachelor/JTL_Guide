(function() {
    const clerk_query_tokens = '{{ query }}'.toLowerCase().trim().split(' '),
        clerk_host_selector = '#{{ content.id }}',
        product_tile_selector = '.clerk_instant_search_product',
        product_image_selector = '.clerk_instant_search_product_image',
        product_tiles = document.querySelectorAll(`${clerk_host_selector} ${product_tile_selector}`);

    clerk_query_tokens.forEach(token => {
        for ( i = 0; i < product_tiles; i++ ){
            const product_synonyms = product_tiles[i].dataset.variantSynonyms.toLowerCase().split('|'),
                product_alt_images = product_tiles[i].dataset.variantImages.split('|');

            for (j = 0; j < product_synonyms.length; j++) {
                if(product_synonyms.includes(token)){
                    product_tiles[i].querySelector(product_image_selector).setAttribute('src', product_alt_images[j]);
                }
            }
        }
    });
})();