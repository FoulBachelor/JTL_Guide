(function() {
	// Set Product Image, based on query.
    const clerk_query_tokens = '{{ query }}'.toLowerCase().trim().split(' '),
        clerk_host_selector = document.querySelector('[data-target][data-query][data-template][data-clerk-content-id]').dataset.target,
        product_tile_selector = '.clerk_product_tile_s',
        product_image_selector = '.clerk_product_image',
        product_tiles = document.querySelectorAll(`${clerk_host_selector} ${product_tile_selector}`);

    clerk_query_tokens.forEach(token => {
        for ( i = 0; i < product_tiles; i++ ){
            const product_synonyms = product_tiles[i].dataset.variantSynonyms.toLowerCase().split('|'),
                product_alt_images = product_tiles[i].dataset.variantImages.split('|');

            for (j = 0; j < product_synonyms.length; j++) {
                if(product_synonyms[j].includes(token)){
                    product_tiles[i].querySelector(product_image_selector).setAttribute('src', product_alt_images[j]);
                }
            }
        }
    });

	// Set Product Image, based on selected facets.
	// Needs data attribute on embedcode, eg: `data-mutation-attributes="variant_colors|variant_sizes"`.
	// You also need to print the attributes you wish to affect the image swap on the product tile tag.
	// The attribute should be the same as it is called in clerk, except _ is replace with -.
	// variant_images => `data-variant-images="domain.com/img/prod1.jpg|domain.com/img/prod2.jpg"`
	const mutation_attributes = document.querySelector('[data-target][data-query][data-template][data-clerk-content-id]').dataset.mutationAttributes.split('|');
	mutation_attributes.forEach(attr => {
		if(document.querySelector(`.clerk-facet-${attr} .clerk-facet-selected`)){
			const facet_value = document.querySelector(`.clerk-facet-${attr} .clerk-facet-selected`).dataset.value.toLowerCase();
			for ( i = 0; i < product_tiles; i++ ){
				const product_attributes = product_tiles[i].getAttribute(`data-${ attr.replace('_', '-') }`).toLowerCase().split('|'),
					product_alt_images = product_tiles[i].dataset.variantImages.split('|');
	
				for (j = 0; j < product_attributes.length; j++) {
					if(product_attributes[j].includes(facet_value)){
						product_tiles[i].querySelector(product_image_selector).setAttribute('src', product_alt_images[j]);
					}
				}
			}
		}
	});
})();