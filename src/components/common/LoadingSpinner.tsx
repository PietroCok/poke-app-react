
export interface LoadingSpinnerProps {
  radius: number,
  duration: number,
  color: string
}

/**
 * @param active Bool show or hide element
 * @param radius Number element radius in px
 * @param duration Number animation duration in seconds
 * @param color String color of the element
 * @returns loading element
 */
export function LoadingSpinner({ radius, duration = 3, color }: LoadingSpinnerProps) {
  if (radius < 0) {
    radius = 15;
  }
  if(duration < 0){
    duration = 2;
  }

  const sub_radius = radius / 5 + 'px';
  let _radius = '';
  let _duration = '';

  _radius = radius + 'px';
  _duration = duration + 's';

  return (
    <div
      className='loading-container'
      style={{
        '--radius': _radius,
        '--sub-elem-radius': sub_radius,
        '--loop-duration': _duration,
        '--color': color
      } as React.CSSProperties}
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