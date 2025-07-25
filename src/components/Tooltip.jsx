import React from "react";
import styled from "styled-components";

const Tooltip = () => {
  return (
    <StyledWrapper>
      <div id="SocialIcons">
        <div className="iconWrapper">
          <p className="iconName github">GitHub</p>
          <div className="icon">
            <a href="https://github.com/Sammaiah-Guguloth/" target="_blank">
              <svg
                viewBox="0 0 24 24"
                width={30}
                height={30}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.621.069-.609.069-.609 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.646 0 0 .84-.27 2.75 1.026a9.564 9.564 0 0 1 2.5-.336 9.54 9.54 0 0 1 2.5.336c1.909-1.296 2.748-1.026 2.748-1.026.546 1.376.202 2.393.1 2.646.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.688-4.565 4.937.359.31.678.924.678 1.861 0 1.344-.012 2.426-.012 2.755 0 .268.18.58.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="iconWrapper">
          <a
            href="https://www.linkedin.com/in/guguloth-sammaiah"
            target="_blank"
          >
            <p className="iconName linkedin">LinkedIn</p>
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                width={30}
                height={30}
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4.983" cy="5.009" r="2.188" fill="currentColor" />
                <path
                  d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </a>
        </div>

        <div className="iconWrapper">
          <a
            href="https://api.whatsapp.com/send?phone=8688338315"
            target="_blank"
          >
            <p className="iconName whatsapp">WhatsApp</p>
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                width={30}
                height={30}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
                  fill="currentColor"
                />
              </svg>
            </div>
          </a>
        </div>

        {/* <div className="iconWrapper">
          <p className="iconName youtube">YouTube</p>
          <div className="icon">
            <svg
              viewBox="0 0 24 24"
              width={30}
              height={30}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div> */}

        <div className="iconWrapper">
          <p className="iconName instagram">Instagram</p>
          <div className="icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width={30}
              height={30}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                fillRule="evenodd"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  #SocialIcons {
    display: flex;
    gap: 30px;
    align-items: center;
  }

  .iconWrapper {
    position: relative;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s ease;
  }

  .iconWrapper:hover {
    transform: scale(1.1);
  }

  .iconName {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    background: #000;
    color: #fff;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    transition: transform 0.3s ease;
    pointer-events: none;
  }

  .iconWrapper:hover .iconName {
    transform: translateX(-50%) scale(1);
  }

  .instagram {
    background: linear-gradient(30deg, #0000ff, #f56040);
  }
  .linkedin {
    background: #0274b3;
  }
  .whatsapp {
    background: #25d366;
  }
  .youtube {
    background: #ff0000;
  }
  .github {
    background: #000000;
  }

  .icon {
    color: #000;
  }
`;

export default Tooltip;
