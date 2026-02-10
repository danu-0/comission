import React from 'react';

const images = [
  './assets/galery/arle.jpg',
  './assets/galery/full.jpg',
  './assets/galery/ei.jpeg',
  './assets/galery/mom.jpg',
  './assets/galery/whit.png',
  './assets/galery/full2.jpg',
  './assets/galery/kafka.jpeg',
  './assets/galery/red.jpg',
];

function Gallery() {
  // Fungsi untuk menangani klik kanan
  const disableRightClick = (event) => {
    event.preventDefault(); 
  };

  
  React.useEffect(() => {
    const imagesElements = document.querySelectorAll('.gallery-image');

    imagesElements.forEach((img) => {
      img.addEventListener('contextmenu', disableRightClick); 
    });

    return () => {
      imagesElements.forEach((img) => {
        img.removeEventListener('contextmenu', disableRightClick); 
      });
    };
  }, []);

  return (
    <div id='galery' className="container mx-auto px-4 py-8">
      <p className="montserrat-regular mb-8">[Gallery]</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md relative">
            <img
              src={image}
              alt={`Image ${index}`}
              className="w-full h-auto gallery-image"
              style={{ pointerEvents: 'none' }} 
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50">
              <p className="text-white font-bold text-xl">Gambar Dilindungi</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
