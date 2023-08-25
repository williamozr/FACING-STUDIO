import { observer } from 'mobx-react-lite';
import React from 'react';
import { SectionTab } from 'polotno/side-panel';
import { ImagesGrid } from 'polotno/side-panel/images-grid';
import MdPhotoLibrary from '@meronex/icons/md/MdPhotoLibrary';
import { getImageSize } from 'polotno/utils/image';
import { InputGroup } from '@blueprintjs/core';

export const LogosPanel = observer(({ store }) => {
  const [images, setImages] = React.useState([]);

  async function loadImages() {
    const imageContext = require.context( 
        "../imgs/Logotipos", 
        true, 
        /\.(jpg|png)$/    
    );
    const imageKeys = imageContext.keys();
    
    // agrupar las rutas de imágenes por categoría (nombre de carpeta)
    const imagesByCategory = {};
    imageKeys.forEach((key) => {
        const category = key.split("/")[1]; // asumimos que la categoría es el primer directorio después de IMAGES_DIR
        imagesByCategory[category] = imagesByCategory[category] || [];
        imagesByCategory[category].push({ url: imageContext(key) });
    });

    // convertir el objeto imagesByCategory en una matriz de secciones
    const sections = Object.entries(imagesByCategory).map(
      ([category, images]) => ({
          title: category,
          images,
      })
  );

  setImages(sections);
  }

  React.useEffect(() => {
    loadImages();
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'scroll' }}>
      <InputGroup
        leftIcon="search"
        placeholder="Search..."
        onChange={(e) => {
          loadImages();
        }}
        style={{
          marginBottom: '20px',
        }}
      />
      {/* <p>Logos Institucionales: </p> */}
      {/* you can create yur own custom component here */}
      {/* but we will use built-in grid component */}
      {/* 
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image, pos, element) => {
          // image - an item from your array
          // pos - relative mouse position on drop. undefined if user just clicked on image
          // element - model from your store if images was dropped on an element.
          //    Can be useful if you want to change some props on existing element instead of creating a new one
          const { width, height } = await getImageSize(image.url);
          store.activePage.addElement({
            type: 'image',
            src: image.url,
            width,
            height,
            x: pos?.x || 0,
            y: pos?.y || 0,
          });
        }}
        rowsNumber={2}
        isLoading={!images.length}
        loadMore={false}
      /> */}
    {/* Mostrar cada sección separada */}
    
    {images.map((section) => (
      <React.Fragment key={section.title}>
          <p style={{fontSize:'20px', fontWeight:'bold', paddingTop: '20px', textAlign:'center'}}>{section.title}</p>
          <div style={{height: '100%',}}>
            <ImagesGrid
                images={section.images}
                getPreview={(image) => image.url}
                onSelect={async (image, pos, element) => {
                    const { width, height } = await getImageSize(
                        image.url
                    );
                    store.activePage.addElement({
                        type: "image",
                        src: image.url,
                        width,
                        height,
                        x: pos?.x || 0,
                        y: pos?.y || 0,
                    });
                }}
                rowsNumber={3}
                isLoading={!section.images.length}
                loadMore={false}
            />
          </div>
          
      </React.Fragment>
   ))}

  </div>
  );
});
// define the new custom section
export const Logos = {
  name: 'Logos',
  Tab: (props) => (
    <SectionTab name="Logos Institucionales" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  Panel: LogosPanel,
};