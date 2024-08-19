import Typewriter from 'typewriter-effect';

export default function Writer({msg})
{

    return(

<>
<Typewriter
  options={{
    strings: [msg],
    autoStart: true,
    loop: true,
  }}
/>

</>
)
};