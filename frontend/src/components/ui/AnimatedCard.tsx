import React from "react";

interface AnimatedCardProps {
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export default function App({ frontContent, backContent }: AnimatedCardProps) {
  const customStyles = `

  /* From Uiverse.io by milegelu */ 
.container {

  background: #afafafa;
  --gap: 5em;
  --line: 1px;
  --color: rgba(255, 255, 255, 0.2);

  background-image: linear-gradient(
      -90deg,
      transparent calc(var(--gap) - var(--line)),
      var(--color) calc(var(--gap) - var(--line) + 1px),
      var(--color) var(--gap)
    ),
    linear-gradient(
      0deg,
      transparent calc(var(--gap) - var(--line)),
      var(--color) calc(var(--gap) - var(--line) + 1px),
      var(--color) var(--gap)
    );
  background-size: var(--gap) var(--gap);
}


    /* 3D Container */
    .content-3d {
      transform-style: preserve-3d;
      transition: transform 300ms ease-out;
    }

    /* Front and Back Surfaces */
    .front-3d, .back-3d {
      backface-visibility: hidden;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 0.75rem; /* Rounded corners match Tailwind 'rounded-xl' */
      overflow: hidden;
    }

    /* The Flip Logic (using the 'group' class on the container) */
    .card-container:hover .content-3d {
      transform: rotateY(180deg);
    }

    /* Start position of the front side (hidden) */
    .front-3d {
      transform: rotateY(180deg);
      display: flex; /* Ensure front-content takes over */
    }

   .back-gradient {
  border-radius: 0.75rem;
}
   
.back-gradient::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px; /* border thickness */
  border-radius: inherit;
  background: linear-gradient( #0c55b4, #9d69f5);
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
}
    .circle-anim {
      animation: floating 10s infinite linear;
    }
  `;

  return (
    <>
      <style>{customStyles}</style>

      <div className="card-container w-60 h-80 relative group rounded-xl shadow-2xl shadow-gray-800 ">
        <div className="content-3d h-full w-full shadow-xl shadow-[#000000ee] rounded-xl  ">
          <div className="back-3d back-gradient flex justify-center items-center bg-[#151515] ">
            <div className="absolute inset-0 back-gradient rounded-xl" />

            <div className="container absolute w-[99%] h-[99%] bg-[#0f0f0f] rounded-2xl text-white flex flex-col justify-center items-center gap-8 p-4">
              {frontContent}
            </div>
          </div>

          <div className="front-3d bg-[#151515] text-white">
            <div className="img absolute w-full h-full">
              <div
                className="circle-anim absolute rounded-full bg-[#0c55b4] w-[90px] h-[90px] relative"
                style={{ filter: "blur(15px)" }}
              ></div>
              <div
                className="circle-anim absolute rounded-full bg-[#7d33a0] w-[30px] h-[30px] relative"
                style={{
                  left: "160px",
                  top: "-80px",
                  animationDelay: "-1800ms",
                  filter: "blur(15px)",
                }}
              ></div>
              <div
                className="circle-anim absolute rounded-full bg-[#110555] w-[150px] h-[150px] relative"
                style={{
                  left: "50px",
                  top: "0px",
                  animationDelay: "-800ms",
                  filter: "blur(15px)",
                }}
              ></div>
            </div>

            {backContent}
          </div>
        </div>
      </div>
    </>
  );
}
