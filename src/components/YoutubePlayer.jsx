import ReactPlayer from 'react-player'


const YoutubePlayer = ({ videoKey, closeModal, isOpen }) => {


const modal = isOpen && (



<div className='video-modal'>

<button
 className='close-modal'
 type="button"
 onClick={closeModal}
>X</button>
<ReactPlayer 
  className="video-player" 
  url={`https://www.youtube.com/watch?v=${videoKey}`} 
  controls={true}
  playing={true}
  data-testid="youtube-player"
/>
</div>





);

return modal

}



export default YoutubePlayer;