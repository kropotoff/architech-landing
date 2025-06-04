// import all files from assets:
import arcaneFlyer from '../assets/arcane_flyer.jpg';
import architechPlaying from '../assets/architech_playing.jpg';
import architechPicture from '../assets/architech_picture.jpg';
import GoaLisboaFlyer from '../assets/GoaLisboaFlyer.jpeg';
import Typography from '@mui/material/Typography';

const media = [
    architechPlaying,
    arcaneFlyer,
    architechPicture,
    GoaLisboaFlyer, 
];

const Gallery = () => (
  <div>
    <div id="gallery" className="gallery-header">
      <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
        Moments
      </Typography> 
    </div>
    <div className="gallery-container">
      {media.map((src, idx) =>
        (
          <img
            key={idx}
            src={src}
            alt={`Gallery ${idx + 1}`}
            className="gallery-image"
          />
        )
      )}
    </div>
  </div>
);

export default Gallery;