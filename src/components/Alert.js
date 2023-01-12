import { useRef } from "react"
import {CSSTransition} from 'react-transition-group'
import { useSelector } from "react-redux"

export const Alert = () => {
  const nodeRef = useRef(null);
  const visible = useSelector(state => state.alert.visible);
  const type = useSelector(state => state.alert.type);
  const text = useSelector(state => state.alert.text);

  return (
    <CSSTransition
      in={visible}
      timeout={{
        enter: 500,
        exit: 350
      }}
      nodeRef={nodeRef}
      classNames={'alert'}
      mountOnEnter
      unmountOnExit
    >
      <div className={`alert alert-${type || 'warning'} alert-dismissible`} ref={nodeRef}>
        <strong>Внимание!</strong>&nbsp; {text}
      </div>
    </CSSTransition>    
  )
}