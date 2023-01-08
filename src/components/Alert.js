import { useContext, useRef } from "react"
import { AlertContext } from "../context/alert/alertContext"
import {CSSTransition} from 'react-transition-group'

export const Alert = () => {
  const {alert} = useContext(AlertContext)
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={alert.visible}
      timeout={{
        enter: 500,
        exit: 350
      }}
      nodeRef={nodeRef}
      classNames={'alert'}
      mountOnEnter
      unmountOnExit
    >
      <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`} ref={nodeRef}>
        <strong>Внимание!</strong>&nbsp; {alert.text}
      </div>
    </CSSTransition>    
  )
}