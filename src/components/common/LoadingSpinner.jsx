import '../../styles/loading-spinner.css'

/**
 * @param active Bool show or hide element
 * @param radius Number element radius in px
 * @param duration Number animation duration in seconds
 * @param color String color of the element
 * @returns loading element
 */
export default function LoadingSpinner({ radius, duration = '3s', color }) {
  if (!Number(radius)) {
    radius = 15;
  }
  const sub_radius = radius / 5 + 'px';

  if (Number(radius)) {
    radius += 'px';
  }

  if (Number(duration)) {
    duration = duration + 's';
  }

  return (
    <div
      className='loading-container'
      style={{
        '--radius': radius,
        '--sub-elem-radius': sub_radius,
        '--loop-duration': duration,
        '--color': color
      }}
    >
      <div className="loading-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}