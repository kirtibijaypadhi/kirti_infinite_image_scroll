const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;





//helper function to set attributes on DOM elements
function setAttributes(element, attributes)
{
    for(const key in attributes)
    {
        element.setAttribute(key, attributes[key]);
    }
}

// check if all images were loaded
function imageLoaded()
{
    
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

//create elements for links and photos and add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)
    photosArray.forEach( (photo) =>{
        // create <a> to link to unspalsh
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });


        //create image for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //put image inside a, then both inside imageConatiner element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

const count = 30;
const apiKey = 'JrXKuJlRsXHNMcTRwF6Bq52o1b9-WWc0YdV2hpwCSDk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from unspalsh API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        //catch error here
    }
}


// check to see if scrolling near button of page, load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos();  
    }
});





//On Load
getPhotos();