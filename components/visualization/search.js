import * as d3 from 'd3';

let index;
let _visual;

function initSearch(chart, nodes) {
  // Keep a reference of the chart
  _visual = chart;

  // Set popover title
  // document.getElementById('modal-search-title').innerHTML = common_translations[language]['menu_search'];

  // Build index
  index = lunr(function() {
    this.ref('id');
    this.field('label');
    nodes.forEach(function(node) {
      let item = {
        id: node.id,
        label: node.label,
      };
      this.add(item);
    }, this);
  });

  // Listen to keypress and update search results
  // document.getElementById('modal-search-input').addEventListener('keyup', updateSearchResults);
  //
  // // Listen to click events
  // document.getElementById('modal-search-results').addEventListener('click', zoomIntoNode);
  //
  // // Open search modal
  // if (query !== false && focus !== false) {
  //     document.getElementById('modal-search-input').value = query;
  //     updateSearchResults();
  //     search_modal_open();
  // }
}

function updateSearchResults() {
  let input = document.getElementById('modal-search-input');
  let results = document.getElementById('modal-search-results');
  let query = input.value.trim().toLowerCase();
  if (query === '') {
    results.innerHTML = '';
  } else {
    //let items = index.search(query);
    let items = index.query(function(q) {
      q.term(lunr.tokenizer(query), {
        wildcard: lunr.Query.wildcard.TRAILING,
        presence: lunr.Query.presence.REQUIRED,
      });
    });
    if (items.length === 0) {
      results.innerHTML =
        common_translations[language]['search_no_results'] + '.';
    } else {
      let html =
        '<p>' +
        items.length +
        ' ' +
        common_translations[language]['search_results'] +
        '.</p>';
      html += '<ul>';
      for (item of items) {
        node = graph.nodes[item.ref];
        html += '<li node-id="' + item.ref + '">';
        html += node.label + ' (' + node.type + ')';
        html += '</li>';
      }
      html += '</ul>';
      results.innerHTML = html;
    }
  }
}

function zoomIntoNode(event) {
  if (event.target && event.target.tagName === 'LI') {
    id = event.target.getAttribute('node-id');
    var search_modal;
    search_modal.close();
    _visual.zoomIntoNode(id);
  }
}

export { initSearch, zoomIntoNode };
