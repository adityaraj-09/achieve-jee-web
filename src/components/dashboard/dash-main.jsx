
import React from 'react'
import { GiProgression} from "react-icons/gi"
const Dashmain = () => {
  return (
    <>
          <h2>DASHBOARD</h2>
              <section className='d-cards'>
                <div className="d-card">
                  <div className="d-card-left">

                  <div className="card-cir">
                    <GiProgression/>
                  </div>
                  <strong>Topics</strong>
                  <h3>Mechanics</h3>
                  </div>
                  <div className="d-card-right">
                    <div className="d-progress">
                      <svg>
                        <circle cx="38" cy="38" r='36'></circle>
                      </svg>
                      <div className="number">81%</div>
                    </div>
                  </div>
                </div>
                <div className="d-card">
                  <div className="d-card-left">

                  <div className="card-cir">
                    <GiProgression/>
                  </div>
                  <strong>Topics</strong>
                  <h3>Mechanics</h3>
                  </div>
                  <div className="d-card-right">
                    <div className="d-progress">
                      <svg>
                        <circle cx="38" cy="38" r='36'></circle>
                      </svg>
                      <div className="number">81%</div>
                    </div>
                  </div>
                </div>
                <div className="d-card">
                  <div className="d-card-left">

                  <div className="card-cir">
                    <GiProgression/>
                  </div>
                  <strong>Topics</strong>
                  <h3>Mechanics</h3>
                  </div>
                  <div className="d-card-right">
                    <div className="d-progress">
                      <svg>
                        <circle cx="38" cy="38" r='36'></circle>
                      </svg>
                      <div className="number">81%</div>
                    </div>
                  </div>
                </div>
               
               

              </section>
    </>
  )
}

export default Dashmain