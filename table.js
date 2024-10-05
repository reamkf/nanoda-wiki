// @ https://cdn.jsdelivr.net/gh/reamkf/nanoda-wiki@main/table.js

(() => {
	/**
	* 指定されたソースからスクリプトを読み込み、成功時と失敗時にそれぞれ解決または拒否されるPromiseを返します。
	* @param {string} src - スクリプトのソースURL。
	* @param {Object} attributes - スクリプト要素に追加する任意の属性。
	* @returns {Promise<void>} スクリプトの読み込みの完了を示すPromise。
	*/
	function loadScript(src, attributes = {}) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;

			// デフォルトでcrossorigin属性を設定
			if (!attributes.hasOwnProperty('crossorigin')) {
				script.crossOrigin = 'anonymous';
			}

			// Set custom attributes
			for (const [key, value] of Object.entries(attributes)) {
				script.setAttribute(key, value);
			}

			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	function addCSS(css){
		const style = document.createElement("style");
		style.innerHTML = css;
		document.head.append(style);
	}

	document.addEventListener('DOMContentLoaded', (event) => {
		console.log('DOM fully loaded and parsed');
		main();
	});

	// =====================================================================================
	//  tablesorter
	//  URL: https://cdnjs.com/libraries/jquery.tablesorter
	// =====================================================================================

	async function loadTableSorterScripts() {
		console.log('Starting to load TableSorter scripts');
		const scripts = [
			{
				src: "https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.3/js/jquery.tablesorter.min.js",
				attributes: {
					integrity: "sha512-qzgd5cYSZcosqpzpn7zF2ZId8f/8CHmFKZ8j7mU4OUXTNRd5g+ZHBPsgKEwoqxCtdQvExE5LprwwPAgoicguNg==",
					crossorigin: "anonymous",
					referrerpolicy: "no-referrer"
				}
			},
			{
				src: "https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.3/js/jquery.tablesorter.widgets.min.js",
				attributes: {
					integrity: "sha512-dj/9K5GRIEZu+Igm9tC16XPOTz0RdPk9FGxfZxShWf65JJNU2TjbElGjuOo3EhwAJRPhJxwEJ5b+/Ouo+VqZdQ==",
					crossorigin: "anonymous",
					referrerpolicy: "no-referrer"
				}
			}
		];

		for (const script of scripts) {
			try {
				await loadScript(script.src, script.attributes);
				console.log(`Successfully loaded: ${script.src}`);
			} catch (error) {
				console.error(`Failed to load script: ${script.src}`, error);
			}
		}
	}

	async function main() {
		console.log('Entering main function');
		try {
			// TableSorterスクリプトを読み込む
			await loadTableSorterScripts();

			// スクリプト読み込み完了後の処理をここに記述
			console.log("All TableSorter scripts loaded successfully");

			addCSS(`
				/*************
				Blue Theme
				*************/
				/* overall */
				.tablesorter-blue {
					/* width: 100%; */
					background-color: #fff;
					margin: 10px 0 15px;
					text-align: left;
					border-spacing: 0;
					border: #cdcdcd 1px solid;
					border-width: 1px 0 0 1px;
				}
				.tablesorter-blue th,
				.tablesorter-blue td {
					border: #cdcdcd 1px solid;
					border-width: 0 1px 1px 0;
				}

				/* header */
				/* .tablesorter-blue th,
				.tablesorter-blue thead td {
					font: 12px/18px Arial, Sans-serif;
					font-weight: bold;
					color: #000;
					background-color: #99bfe6;
					border-collapse: collapse;
					padding: 4px;
					text-shadow: 0 1px 0 rgba(204, 204, 204, 0.7);
				} */
				/* .tablesorter-blue tbody td,
				.tablesorter-blue tfoot th,
				.tablesorter-blue tfoot td {
					padding: 4px;
					vertical-align: top;
				} */
				.tablesorter-blue .header,
				.tablesorter-blue .tablesorter-header {
					/* black (unsorted) double arrow */
					background-image: url(data:image/gif;base64,R0lGODlhFQAJAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAkAAAIXjI+AywnaYnhUMoqt3gZXPmVg94yJVQAAOw==);
					/* white (unsorted) double arrow */
					/* background-image: url(data:image/gif;base64,R0lGODlhFQAJAIAAAP///////yH5BAEAAAEALAAAAAAVAAkAAAIXjI+AywnaYnhUMoqt3gZXPmVg94yJVQAAOw==); */
					/* image */
					/* background-image: url(images/black-unsorted.gif); */
					background-repeat: no-repeat;
					background-position: center right;
					padding: 4px 18px 4px 4px;
					white-space: normal;
					cursor: pointer;
				}
				.tablesorter-blue .headerSortUp,
				.tablesorter-blue .tablesorter-headerSortUp,
				.tablesorter-blue .tablesorter-headerAsc {
					background-color: #9fbfdf;
					/* black asc arrow */
					background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7);
					/* white asc arrow */
					/* background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAAP///////yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7); */
					/* image */
					/* background-image: url(images/black-asc.gif); */
				}
				.tablesorter-blue .headerSortDown,
				.tablesorter-blue .tablesorter-headerSortDown,
				.tablesorter-blue .tablesorter-headerDesc {
					background-color: #8cb3d9;
					/* black desc arrow */
					background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7);
					/* white desc arrow */
					/* background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAAP///////yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7); */
					/* image */
					/* background-image: url(images/black-desc.gif); */
				}
				.tablesorter-blue thead .sorter-false {
					background-image: none;
					cursor: default;
					padding: 4px;
				}

				/* tfoot */
				.tablesorter-blue tfoot .tablesorter-headerSortUp,
				.tablesorter-blue tfoot .tablesorter-headerSortDown,
				.tablesorter-blue tfoot .tablesorter-headerAsc,
				.tablesorter-blue tfoot .tablesorter-headerDesc {
					/* remove sort arrows from footer */
					background-image: none;
				}

				/* tbody */
				/* .tablesorter-blue td {
					color: #3d3d3d;
					background-color: #fff;
					padding: 4px;
					vertical-align: top;
				} */

				/* hovered row colors
				you'll need to add additional lines for
				rows with more than 2 child rows
				*/
				/* .tablesorter-blue tbody > tr.hover > td,
				.tablesorter-blue tbody > tr:hover > td,
				.tablesorter-blue tbody > tr:hover + tr.tablesorter-childRow > td,
				.tablesorter-blue tbody > tr:hover + tr.tablesorter-childRow + tr.tablesorter-childRow > td,
				.tablesorter-blue tbody > tr.even.hover > td,
				.tablesorter-blue tbody > tr.even:hover > td,
				.tablesorter-blue tbody > tr.even:hover + tr.tablesorter-childRow > td,
				.tablesorter-blue tbody > tr.even:hover + tr.tablesorter-childRow + tr.tablesorter-childRow > td {
					background-color: #d9d9d9;
				}
				.tablesorter-blue tbody > tr.odd.hover > td,
				.tablesorter-blue tbody > tr.odd:hover > td,
				.tablesorter-blue tbody > tr.odd:hover + tr.tablesorter-childRow > td,
				.tablesorter-blue tbody > tr.odd:hover + tr.tablesorter-childRow + tr.tablesorter-childRow > td {
					background-color: #bfbfbf;
				} */

				/* table processing indicator */
				.tablesorter-blue .tablesorter-processing {
					background-position: center center !important;
					background-repeat: no-repeat !important;
					/* background-image: url(images/loading.gif) !important; */
					background-image: url('data:image/gif;base64,R0lGODlhFAAUAKEAAO7u7lpaWgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQBCgACACwAAAAAFAAUAAACQZRvoIDtu1wLQUAlqKTVxqwhXIiBnDg6Y4eyx4lKW5XK7wrLeK3vbq8J2W4T4e1nMhpWrZCTt3xKZ8kgsggdJmUFACH5BAEKAAIALAcAAAALAAcAAAIUVB6ii7jajgCAuUmtovxtXnmdUAAAIfkEAQoAAgAsDQACAAcACwAAAhRUIpmHy/3gUVQAQO9NetuugCFWAAAh+QQBCgACACwNAAcABwALAAACE5QVcZjKbVo6ck2AF95m5/6BSwEAIfkEAQoAAgAsBwANAAsABwAAAhOUH3kr6QaAcSrGWe1VQl+mMUIBACH5BAEKAAIALAIADQALAAcAAAIUlICmh7ncTAgqijkruDiv7n2YUAAAIfkEAQoAAgAsAAAHAAcACwAAAhQUIGmHyedehIoqFXLKfPOAaZdWAAAh+QQFCgACACwAAAIABwALAAACFJQFcJiXb15zLYRl7cla8OtlGGgUADs=') !important;
				}

				/* Zebra Widget - row alternating colors */
				.tablesorter-blue tbody tr.odd > td {
					background-color: #ebf2fa;
				}
				.tablesorter-blue tbody tr.even > td {
					background-color: #fff;
				}

				/* Column Widget - column sort colors */
				.tablesorter-blue td.primary,
				.tablesorter-blue tr.odd td.primary {
					background-color: #99b3e6;
				}
				.tablesorter-blue tr.even td.primary {
					background-color: #c2d1f0;
				}
				.tablesorter-blue td.secondary,
				.tablesorter-blue tr.odd td.secondary {
					background-color: #c2d1f0;
				}
				.tablesorter-blue tr.even td.secondary {
					background-color: #d6e0f5;
				}
				.tablesorter-blue td.tertiary,
				.tablesorter-blue tr.odd td.tertiary {
					background-color: #d6e0f5;
				}
				.tablesorter-blue tr.even td.tertiary {
					background-color: #ebf0fa;
				}

				/* caption */
				.tablesorter-blue > caption {
					background-color: #fff;
				}

				/* filter widget */
				.tablesorter-blue .tablesorter-filter-row {
					background-color: #eee;
				}
				.tablesorter-blue .tablesorter-filter-row td {
					background-color: #eee;
					line-height: normal;
					text-align: center; /* center the input */
					-webkit-transition: line-height 0.1s ease;
					-moz-transition: line-height 0.1s ease;
					-o-transition: line-height 0.1s ease;
					transition: line-height 0.1s ease;
				}
				/* optional disabled input styling */
				.tablesorter-blue .tablesorter-filter-row .disabled {
					opacity: 0.5;
					filter: alpha(opacity=50);
					cursor: not-allowed;
				}
				/* hidden filter row */
				.tablesorter-blue .tablesorter-filter-row.hideme td {
					/*** *********************************************** ***/
					/*** change this padding to modify the thickness     ***/
					/*** of the closed filter row (height = padding x 2) ***/
					padding: 2px;
					/*** *********************************************** ***/
					margin: 0;
					line-height: 0;
					cursor: pointer;
				}
				.tablesorter-blue .tablesorter-filter-row.hideme * {
					height: 1px;
					min-height: 0;
					border: 0;
					padding: 0;
					margin: 0;
					/* don't use visibility: hidden because it disables tabbing */
					opacity: 0;
					filter: alpha(opacity=0);
				}
				/* filters */
				.tablesorter-blue input.tablesorter-filter,
				.tablesorter-blue select.tablesorter-filter {
					width: 98%;
					height: auto;
					margin: 0;
					padding: 4px;
					background-color: #fff;
					border: 1px solid #bbb;
					color: #333;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					-webkit-transition: height 0.1s ease;
					-moz-transition: height 0.1s ease;
					-o-transition: height 0.1s ease;
					transition: height 0.1s ease;
				}
				/* rows hidden by filtering (needed for child rows) */
				.tablesorter .filtered {
					display: none;
				}

				/* ajax error row */
				.tablesorter .tablesorter-errorRow td {
					text-align: center;
					cursor: pointer;
					background-color: #e6bf99;
				}

				.input-table-filter:not(.input-table-filter-ex){
					display: none !important;
				}
			`);
			console.log('CSS added successfully');

			$("table.filter").each(function(i){
				console.log(`Initializing table ${i + 1}`);
				const $table = $(this);

				// External any-column search
				const $divInputTableFilter = $("<div>", {
					"class": "input-table-filter input-table-filter-ex",
					style: "width: 400px"
				});

				const $inputTableFilter = $("<input>", {
					type: "search",
					placeholder: "キーワードで絞り込み",
					"data-column": "all",
					style: "width: 300px; background-color: #fff; border: 1px #ccc solid;",
				}).appendTo($divInputTableFilter);

				$table.before($divInputTableFilter);
				console.log('External filter input added');

				// Drop down menu
				const filterFunc = null;
				// const filterFunc = {};
				// let i = 0;
				// $table.find("th").each(function(){
				//     const text = $(this).text();
				//     if(text.indexOf("属性") != -1){
				//         filterFunc[i] = {
				//             "ファニー" : function(e, n, f, i, $r, c, data) { return /ファニー/.test(e); },
				//             "フレンドリー" : function(e, n, f, i, $r, c, data) { return /フレンドリー/.test(e); },
				//             "リラックス" : function(e, n, f, i, $r, c, data) { return /リラックス/.test(e); },
				//             "ラブリー" : function(e, n, f, i, $r, c, data) { return /ラブリー/.test(e); },
				//             "アクティブ" : function(e, n, f, i, $r, c, data) { return /アクティブ/.test(e); },
				//             "マイペース" : function(e, n, f, i, $r, c, data) { return /マイペース/.test(e); }
				//         };
				//     }
				//     else if(text.indexOf("☆") != -1 || text.indexOf("☆") != -1){
				//         filterFunc[i] = {
				//             "☆4" : function(e, n, f, i, $r, c, data) { return /4/.test(e); },
				//             "☆3" : function(e, n, f, i, $r, c, data) { return /3/.test(e); },
				//             "☆2" : function(e, n, f, i, $r, c, data) { return /2/.test(e); },
				//             "☆1" : function(e, n, f, i, $r, c, data) { return /1/.test(e); }
				//         };
				//     }
				//     i++;
				// });

				console.log('Initializing tablesorter');
				$table.tablesorter({
					theme: 'blue',

					headers: {
						".tablesorter-header-inner": {
							sorter: $table.hasClass("sort")
						}
					},

					// hidden filter input/selects will resize the columns, so try to minimize the change
					widthFixed : false,

					// initialize filter widgets
					widgets: ["filter"],

					ignoreCase: true,

					sortReset: true,

					widgetOptions : {
						// filter_anyMatch options was removed in v2.15; it has been replaced by the filter_external option

						// If there are child rows in the table (rows with class name from "cssChildRow" option)
						// and this option is true and a match is found anywhere in the child row, then it will make that row
						// visible; default is false
						filter_childRows : false,

						// if true, filter child row content by column; filter_childRows must also be true
						filter_childByColumn : false,

						// if true, include matching child row siblings
						filter_childWithSibs : false,

						// if true, a filter will be added to the top of each table column;
						// disabled by using -> headers: { 1: { filter: false } } OR add class="filter-false"
						// if you set this to false, make sure you perform a search using the second method below
						filter_columnFilters : true,

						// if true, allows using "#:{query}" in AnyMatch searches (column:query; added v2.20.0)
						filter_columnAnyMatch: true,

						// extra css class name (string or array) added to the filter element (input or select)
						filter_cellFilter : '',

						// extra css class name(s) applied to the table row containing the filters & the inputs within that row
						// this option can either be a string (class applied to all filters) or an array (class applied to indexed filter)
						filter_cssFilter : '', // or []

						// add a default column filter type "~{query}" to make fuzzy searches default;
						// "{q1} AND {q2}" to make all searches use a logical AND.
						filter_defaultFilter : {},

						// filters to exclude, per column
						filter_excludeFilter : {},

						// jQuery selector (or object) pointing to an input to be used to match the contents of any column
						// please refer to the filter-any-match demo for limitations - new in v2.15
						filter_external : $inputTableFilter,

						// class added to filtered rows (rows that are not showing); needed by pager plugin
						filter_filteredRow : 'filtered',

						// ARIA-label added to filter input/select; {{label}} is replaced by the column header
						// "data-label" attribute, if it exists, or it uses the column header text
						filter_filterLabel : 'Filter "{{label}}" column by...',

						// add custom filter elements to the filter row
						// see the filter formatter demos for more specifics on how to use this option
						filter_formatter : null,

						// add custom filter functions using this option
						// see the filter widget custom demo for more specifics on how to use this option
						filter_functions : filterFunc,

						// hide filter row when table is empty
						filter_hideEmpty : false,

						// if true, filters are collapsed initially, but can be revealed by hovering over the grey bar immediately
						// below the header row. Additionally, tabbing through the document will open the filter row when an input gets focus
						// in v2.26.6, this option will also accept a function
						filter_hideFilters : false,

						// Set this option to false to make the searches case sensitive
						filter_ignoreCase : true,

						// if true, search column content while the user types (with a delay).
						// In v2.27.3, this option can contain an
						// object with column indexes or classnames; "fallback" is used
						// for undefined columns
						filter_liveSearch : true,

						// global query settings ('exact' or 'match'); overridden by "filter-match" or "filter-exact" class
						filter_matchType : { 'input': 'match', 'select': 'match' },

						// a header with a select dropdown & this class name will only show available (visible) options within that drop down.
						filter_onlyAvail : 'filter-onlyAvail',

						// default placeholder text (overridden by any header "data-placeholder" setting)
						filter_placeholder : { search : '検索', select : '選択' },

						// jQuery selector string of an element used to reset the filters
						filter_reset : 'button.reset',

						// Reset filter input when the user presses escape - normalized across browsers
						filter_resetOnEsc : true,

						// Use the $.tablesorter.storage utility to save the most recent filters (default setting is false)
						filter_saveFilters : false,

						// Delay in milliseconds before the filter widget starts searching; This option prevents searching for
						// every character while typing and should make searching large tables faster.
						filter_searchDelay : 300,

						// allow searching through already filtered rows in special circumstances; will speed up searching in large tables if true
						filter_searchFiltered: true,

						// include a function to return an array of values to be added to the column filter select
						filter_selectSource  : null,

						// if true, server-side filtering should be performed because client-side filtering will be disabled, but
						// the ui and events will still be used.
						filter_serversideFiltering : false,

						// Set this option to true to use the filter to find text from the start of the column
						// So typing in "a" will find "albert" but not "frank", both have a's; default is false
						filter_startsWith : false,

						// Filter using parsed content for ALL columns
						// be careful on using this on date columns as the date is parsed and stored as time in seconds
						filter_useParsedData : false,

						// data attribute in the header cell that contains the default filter value
						filter_defaultAttrib : 'data-value',

						// filter_selectSource array text left of the separator is added to the option value, right into the option text
						filter_selectSourceSeparator : '|'
					}
				});
				console.log(`Table ${i + 1} initialized with tablesorter`);

				// Add event listeners
				addTableEventListeners($table);
			});

		} catch (error) {
			console.error("Error in main function:", error);
		}
		console.log('Exiting main function');
	}

	// Add a new function to log table events
	function addTableEventListeners($table) {
		$table
			.on('tablesorter-initialized', function() {
				console.log('Table initialized');
			})
			.on('filterEnd', function() {
				console.log('Filtering completed');
			})
			.on('sortEnd', function() {
				console.log('Sorting completed');
			});
	}

})();