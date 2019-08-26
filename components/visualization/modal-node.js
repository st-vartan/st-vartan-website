import * as d3 from 'd3';
//Initialize the function for showing the modal on node's 2nd click on hover
function createModal(obj) {
  d3.select('#chart-modal-img-slider').html('');
  if (obj.meta && obj.meta.icon) {
    d3.select('#chart-modal-full-img').style(
      'background-image',
      `url("${obj.meta.icon.large}")`
    );
    //Change to 2nd image if the first is portrait, hoping the 2nd one isn't...
    /*
        let img = new Image()
        img.src = obj.meta.icon.small
        img.onload = function () {
            if (this.width < this.height) d3.select("#chart-modal-full-img").style("background-image", `url("${obj.meta.images[1].url}")`)
        }//onload
        */
  } //if

  //Change titles
  // d3.select("#modal-node-type").html((obj.meta && obj.meta.list) ? common_translations[language][obj.meta.list.toLowerCase()] : typeConversion(obj.type))
  d3.select('#modal-node-title').html(obj.label);
  d3.select('#modal-node-year').html(
    obj.meta && obj.meta.year ? obj.meta.year : ''
  );
  d3.select('#modal-node-countries').html(obj.countries.sort().join(', '));
  if (obj.meta && obj.meta.description)
    d3.select('#modal-node-description').html(obj.meta.description);
  else d3.select('#modal-node-description').html(null);

  d3.select('#modal-node-link').html(null);
  // if (obj.meta && obj.meta.link) {
  // 	d3.select("#modal-node-link").html('<a href="' + obj.meta.link + '" target="_blank">' + common_translations[language]['more'] + '</a>');
  // }

  //Show the modal
  node_modal.open('#chart-modal');

  //Carousel
  if (obj.meta && (obj.meta.images || obj.meta.video)) {
    let glideDiv = document.createElement('div');
    glideDiv.setAttribute('class', 'slider__track glide__track');
    glideDiv.setAttribute('data-glide-el', 'track');

    let glideNextButton = document.createElement('button');
    glideNextButton.setAttribute('data-glide-dir', '>');
    glideNextButton.setAttribute('class', 'right');
    glideNextButton.innerHTML = '&#9654;';
    let glidePrevButton = document.createElement('button');
    glidePrevButton.setAttribute('data-glide-dir', '<');
    glidePrevButton.innerHTML = '&#9664;';

    let glideNPDiv = document.createElement('div');
    glideNPDiv.setAttribute('id', 'chart-modal-img-slider-controls');
    glideNPDiv.setAttribute('data-glide-el', 'controls');
    glideNPDiv.appendChild(glidePrevButton);
    glideNPDiv.appendChild(glideNextButton);

    let glideBulletDiv = document.createElement('div');
    glideBulletDiv.setAttribute('class', 'glide__bullets');
    glideBulletDiv.setAttribute('data-glide-el', 'controls[nav]');

    let cmp = 0;
    let glideUl = document.createElement('ul');
    if (obj.meta.video) {
      for (i = 0; i < obj.meta.video.length; i++) {
        let glideLi = document.createElement('li');
        glideLi.setAttribute(
          'title',
          obj.meta.video[i].title + ' - ' + obj.meta.video[i].copyright
        );

        let glideVideo = document.createElement('iframe');
        glideVideo.src =
          obj.meta.video[i].url.replace('watch?v=', 'embed/') + '?rel=0&fs=0';

        let glideVideoDesc = document.createElement('p');
        glideVideoDesc.setAttribute('class', 'description');
        glideVideoDesc.append(obj.meta.video[i].title);
        let glideVideoCr = document.createElement('p');
        glideVideoCr.setAttribute('class', 'copyright');
        if (obj.meta.video[i].copyright !== '')
          glideVideoCr.append('© ' + obj.meta.video[i].copyright);

        glideLi.appendChild(glideVideo);
        glideLi.appendChild(glideVideoDesc);
        glideLi.appendChild(glideVideoCr);
        glideUl.appendChild(glideLi);

        let bulletButton = document.createElement('button');
        bulletButton.setAttribute('class', 'glide__bullet');
        bulletButton.setAttribute('data-glide-dir', '=' + cmp);
        glideBulletDiv.appendChild(bulletButton);
        cmp++;
      }
    }
    if (obj.meta.images) {
      for (i = 0; i < obj.meta.images.length; i++) {
        let glideLi = document.createElement('li');
        glideLi.setAttribute(
          'title',
          obj.meta.images[i]['title'] + ' - ' + obj.meta.images[i]['copyright']
        );

        let glideImg = new Image();
        glideImg.alt = obj.meta.images[i]['title'];
        glideImg.src = obj.meta.images[i]['url'];

        let glideImgDesc = document.createElement('p');
        glideImgDesc.setAttribute('class', 'description');
        glideImgDesc.append(obj.meta.images[i]['title']);
        let glideImgCr = document.createElement('p');
        glideImgCr.setAttribute('class', 'copyright');
        if (obj.meta.images[i]['copyright'] !== '')
          glideImgCr.append('© ' + obj.meta.images[i]['copyright']);

        glideLi.appendChild(glideImg);
        glideLi.appendChild(glideImgDesc);
        glideLi.appendChild(glideImgCr);
        glideUl.appendChild(glideLi);

        let bulletButton = document.createElement('button');
        bulletButton.setAttribute('class', 'glide__bullet');
        bulletButton.setAttribute('data-glide-dir', '=' + cmp);
        glideBulletDiv.appendChild(bulletButton);
        cmp++;
      }
    }
    glideDiv.appendChild(glideUl);

    document.getElementById('chart-modal-img-slider').appendChild(glideDiv);
    document.getElementById('chart-modal-img-slider').appendChild(glideNPDiv);
    document
      .getElementById('chart-modal-img-slider')
      .appendChild(glideBulletDiv);

    let glide = new Glide('#chart-modal-img-slider', {
      type: 'carousel',
      perView: 1,
    });
    glide.mount();
  }

  // Permalink

  let permalink = document.getElementById('permalink');
  if (permalink !== null) {
    let url =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?focus=' +
      obj.id.substring(8);
    permalink.setAttribute('style', 'display: block;');
    permalink.innerHTML = 'Permalink: <a href="' + url + '">' + url + '</a>';
  }
} //function createModal

//Simple conversion from the node types to what is placed in the tooltip
function typeConversion(type) {
  if (type === 'element') type = 'ich';
  return type.charAt(0).toUpperCase() + type.slice(1); // Capitalize first letter
} //function typeConversion

// Scroll to carousel
function node_modal_init_scroll() {
  // document.getElementById('modal-node-watch').innerHTML = '<a>' + common_translations[language]['watch'] + '</a>';
  // document.querySelectorAll('#modal-node-watch a')[0].addEventListener('click', function() {
  //     let offset = document.getElementById('chart-modal-img-slider').offsetTop;
  //     document.querySelectorAll('.modal-inner')[0].scrollTop = offset;
  // });
}

export { createModal, typeConversion, node_modal_init_scroll };
