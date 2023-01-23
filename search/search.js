<script>
document.querySelector('#clerk-search').dataset.query = decodeURI(window.location.search.split('?w=')[1].replace(/\+/g, ' '))

Clerk('content', '.clerk_m')
 
 
document.querySelector('#clerk-show-facets').addEventListener('click', function(){
	target = document.querySelector('#clerk-search-filters');
	if(target.style.display === 'none'){
		target.style.display = 'block';
	} else {
		target.style.display = 'none';
	}
 
})
 
 
//Sorting For Facets
var mastSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL", "4XL", "5XL", "One size"];
var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;
function localeSort(s) {
	Array.prototype.slice.call(s).sort(function sort (ea, eb) {
	var aA = ea.textContent.replace(reA, "");
	var bA = eb.textContent.replace(reA, "");
	if (aA === bA) {
		var aN = parseInt(ea.textContent.replace(reN, ""), 10);
		var bN = parseInt(eb.textContent.replace(reN, ""), 10);
		return aN === bN ? 0 : aN > bN ? 1 : -1;
	} else {
		return aA > bA ? 1 : -1;
	}
	}).forEach(function(div) {
		div.parentElement.appendChild(div);
	});
}
 
 
 
document.querySelector('select.clerk-result-sort').addEventListener('change', function(){
	selection = this.value;
	if(selection == 'relevance'){
		Clerk('content', '#clerk-search', 'param', {
			orderby: null,
			order: null
		});
	}
	if(selection == 'upprice'){
		Clerk('content', '#clerk-search', 'param', {
			orderby: 'price',
			order: 'asc'
		});
	}
	if(selection == 'downprice'){
		Clerk('content', '#clerk-search', 'param', {
			orderby: 'price',
			order: 'desc'
		});
	}
	if(selection == 'upname'){
		Clerk('content', '#clerk-search', 'param', {
			orderby: 'name',
			order: 'asc'
		});
	}
	if(selection == 'downname'){
		Clerk('content', '#clerk-search', 'param', {
			orderby: 'name',
			order: 'desc'
		});
	}
})
 
if(!facetStateObj){
	var facetStateObj = {};
}
 
Clerk('on', 'rendered', '#clerk-search', function (data, content) {
 
 
 
 
	//console.log(content)
	//remove variant duplicates
	var query = document.querySelector('#clerk-search').dataset.query.toLowerCase().split(' ');
	var host = document.querySelector('#clerk-search-results');
	var product_card = host.querySelectorAll('.clerk-design-product');
	var rsp = content.product_data;
	for(i=0;i<query.length;i++){
		word = query[i];
		//console.log(word)
		for(j=0;j<rsp.length;j++){
			list = rsp[j].variant_colors_synonyms;
			alt_imgz = rsp[j].variant_images;
			//list = product_card[j].dataset.synonyms.toLowerCase().split(',');
			//alt_imgz = product_card[j].dataset.vimages.split('g,');
				for(jj=0;jj<list.length;jj++){
					//console.log(list[jj], '      '+word)
					if(list[jj].toLowerCase().indexOf(word) > -1){
						new_image = alt_imgz[jj];
						//console.log(new_image)
						product_card[j].querySelector('.clerk-design-component-JhII4gjU').style.backgroundImage = `url(${new_image})`
					}
				}
 
		}
	}
 
	document.querySelectorAll('.clerk-swatch-wrap').forEach(function(item,index){
		var srcs = [],
			  temp,
			  swatches = item.querySelectorAll('.clerk-variant-swatch');
			  for(i=0;i<swatches.length;i++){
				el = swatches[i];
				temp = el.src;
			if(srcs.indexOf(temp) < 0){
				  srcs.push(temp);
			} else {
				  el.remove();
			}
		}
	})
 
	//Code to replace jquery slidetoggle, bound to titles in loop.
 
	var title_toggle = document.querySelectorAll('.clerk-facet-group-title');
 
	var screenW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
 
	for(i = 0; i < title_toggle.length; i++){
 
		if(screenW > 800){
			desktopTitle = title_toggle[i];
			var desktopFacetSearch = (desktopTitle.parentNode.querySelector('.clerk-facet-search')) ? desktopTitle.parentNode.querySelector('.clerk-facet-search') : null;
			var desktopContainer = desktopTitle.parentNode.querySelector('.clerk-facet-group-facets');
			var desktopObjkey = desktopTitle.parentNode.dataset.facetGroup;
 
			desktopContainer.classList.add('active');
			desktopContainer.style.height = 'auto';
 
			if(desktopFacetSearch){
				desktopFacetSearch.style.display = 'inline-block';
			}
 
			var desktopHeight = desktopContainer.clientHeight + 'px';
 
			desktopContainer.style.height = desktopHeight;
 
		}
 
		title_toggle[i].addEventListener('click', function(event){
 
		objkey = this.parentNode.dataset.facetGroup;
 
		event.preventDefault();
 
		//var container = document.getElementById(this.dataset.container);
		var facetSearch = (this.parentNode.querySelector('.clerk-facet-search')) ? this.parentNode.querySelector('.clerk-facet-search') : null;
		var container = this.parentNode.querySelector('.clerk-facet-group-facets');
 
		if (!container.classList.contains('active')) {
 
			facetStateObj[objkey] = true;
 
			container.classList.add('active');
			container.style.height = 'auto';
 
			if(facetSearch){
				facetSearch.style.display = 'inline-block';
			}
 
			var height = container.clientHeight + 'px';
 
			container.style.height = '0px';
 
			//document.querySelector('.clerk-facet-product_type .clerk-facet-group-facets.active').removeAttribute('style');
 
			setTimeout(function () {
				container.style.height = height;
			}, 0);
 
 
 
		} else {
 
			facetStateObj[objkey] = false;
 
			if(facetSearch){
				facetSearch.style.display = 'none';
			}
 
			container.style.height = '0px';
 
			container.addEventListener('transitionend', function () {
				container.classList.remove('active');
			}, {
				once: true
			});
 
		}
 
		});
 
	}
 
 
 
	var currentUrl = window.location.href;
	if (currentUrl.indexOf('!') == currentUrl.length - 1) {
		document.querySelector('.no-stock-clerk').style.display = 'block';
	}
	document.querySelectorAll('.main-product').forEach(function(item, index){
		mainProductType = item.dataset.productType;
		t = document.querySelectorAll(`.clerk-facet-product_type [data-value="${mainProductType}"]`);
		for(j=0;j<t.length;j++){
			t[j].classList.remove('type-tag-clerk');
			t[j].classList.remove('indented');
			t[j].classList.add('non-indented');
		}
	})
	if(document.querySelector('.clerk-facet-selected.non-indented')){
		document.querySelector('.clerk-facet-product_type .clerk-facet-group-facets').prepend(document.querySelector('.clerk-facet-selected.non-indented'))
	}
 
	if(document.querySelectorAll('.clerk-facet-product_type .clerk-facet-selected').length > 0){
		var second_cat_list = document.querySelectorAll('.clerk-facet-product_type .non-indented.clerk-facet-selected');
		for(i=0;i<second_cat_list.length;i++){
			t = second_cat_list[i];
			var selectedType = t.dataset.value;
			document.querySelectorAll(`[data-product-type="${selectedType}"]`).forEach(function(item, index){
				var secondType = item.dataset.productTypeSecondary,
					second_selector = document.querySelectorAll(`[data-value="${secondType}"]`);
				for(u=0;u<second_selector.length;u++){
					q = second_selector[u];
					q.classList.remove('type-tag-clerk');
					q.style.paddingLeft = '15px';
				}
			});
		}
		if(document.querySelectorAll('.clerk-facet-selected.indented').length > 0){
			indented_facets = document.querySelectorAll('.clerk-facet-selected.indented');
			for(i=0;i<indented_facets.length;i++){
				t = indented_facets[i];
				myTypeFilter = t.dataset.value;
				document.querySelectorAll(`[data-product-type-secondary="${myTypeFilter}"]`).forEach(function(item, index){
					item.classList.remove('clerk-type');
				})
			}
			document.querySelectorAll('.clerk-type').forEach(function(item,index){
				item.remove();
			})
			document.querySelectorAll('.non-indented').forEach(function(item, index){
				item.addEventListener('click', function (e){
					r = document.querySelectorAll('.clerk-facet-selected.indented');
					for(o=0;o<r.length;o++){
						r[o].click();
					}
				})
			})
		}
	}
 
	//Change Image on hover
	document.querySelectorAll('.clerk-variant-swatch').forEach(function(item,index){
		item.addEventListener('mouseenter', function(){
			var hoverIdentifier = item.dataset.name,
				hoverUrl = item.dataset.varImg;
				target = document.querySelector(`[data-main-name="${hoverIdentifier}"] .clerk-design-component-JhII4gjU`);
				target.style.opacity = 0;
				target.style.backgroundImage = `url(${hoverUrl})`;
				target.style.transition = 'all 0.5s';
				setTimeout(function(){
					target.style.opacity = 1;
				},0);
		})
	})
 
	if(document.querySelector('.clerk-facet-instock .clerk-facet-selected[data-value="true"]')){
		document.querySelectorAll('.clerk-variant-swatch').forEach(function(item,index){
			stockVal = item.dataset.varStock;
			if(stockVal == 0){
				item.remove();
			}
		})
		document.querySelectorAll('.main-product').forEach(function(item,index){
			selectSwatch = item.querySelector('.clerk-variant-swatch')
			replaceImg = selectSwatch.dataset.varImg;
			imgLocation = item.querySelector('.clerk-design-component-JhII4gjU')
			imgLocation.style.backgroundImage = `url('${replaceImg}')`;
		})
	}
 
	//If color selected, replace main image with the relevant one and add class class to detect which cards are changed
 
 
	if(document.querySelector('.clerk-facet-variant_colors .clerk-facet-selected')){
		colorPick = document.querySelector('.clerk-facet-variant_colors .clerk-facet-selected').dataset.value;
		targets = document.querySelectorAll(`.clerk-design-product [data-var-color="${colorPick}"]`);
		v = document.querySelectorAll('.clerk-design-product');
		for(i=0;i<targets.length;i++){
			y = targets[i];
			findImg = y.dataset.varImg;
			mainImageDiv = y.parentNode.parentNode.querySelector('.clerk-design-component-JhII4gjU');
			mainImageDiv.style.backgroundImage = `url('${findImg}')`;
			v[i].classList.remove('main-product');
			v[i].classList.add('markz');
		}
	}
 
	//If size, replace main image with the relevant one and add class class to detect which cards are changed
 
 
	if(document.querySelector('.clerk-facet-variant_sizes .clerk-facet-selected')){
		colorPick = document.querySelector('.clerk-facet-variant_sizes .clerk-facet-selected').dataset.value;
		targets = document.querySelectorAll(`.clerk-design-product [data-var-size="${sizePick}"]`);
		v = document.querySelectorAll('.clerk-design-product');
		for(i=0;i<targets.length;i++){
			y = targets[i];
			findImg = y.dataset.varImg;
			mainImageDiv = y.parentNode.parentNode.querySelector('.clerk-design-component-JhII4gjU');
			mainImageDiv.style.backgroundImage = `url('${findImg}')`;
			v[i].classList.remove('main-product');
			v[i].classList.add('markz');
		}
	}
 
	if(document.querySelector('.markz')){
		document.querySelectorAll('.main-product').forEach(function(item,index){
			item.remove();
		})
	}
 
	var resultCount = document.querySelectorAll('.clerk-design-component-tOCxuayL').length;
	var resultQuery = document.querySelector('#clerk-search').dataset.query;
	var headerProductCount = document.createElement('div')
	headerProductCount.className = 'clerk-result-count';
	if(!document.querySelector('.clerk-result-count')){
		document.querySelector('#clerk-show-facets').appendChild(headerProductCount);
	} else {
		document.querySelector('.clerk-result-count').textContent = `Showing ${resultCount} results for ${resultQuery}`;
	}
 
	var facetGroups = document.querySelectorAll('.clerk-facet-group:not(.clerk-facet-price)');
 
	var sizeGroup = document.querySelector('.clerk-facet-variant_sizes')
 
	for(i=0;i<facetGroups.length;i++){
		sel = facetGroups[i].querySelectorAll('.clerk-facet');
		localeSort(sel);
	}
 
	for(i=mastSizes.length;i>-1;i--){
		size = mastSizes[i];
		selector = sizeGroup.querySelectorAll(`.clerk-facet[data-value*="${size}"]`)
		selector.forEach(function(item){
			if(item.dataset.value.indexOf('Short') == -1 && item.dataset.value.indexOf('Long') == -1 && item.dataset.value.indexOf('US') == -1){
			sizeGroup.querySelector('.clerk-facet-group-facets').prepend(item);
			}
		});
 
	}
 
 
	for(i=0;i<title_toggle.length;i++){
		if(facetStateObj[title_toggle[i].parentNode.dataset.facetGroup] == true){
			title_toggle[i].click()
		}
	}
 
});
</script>