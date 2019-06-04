import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { findChildren } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import map from 'lodash/map';
import { getOffset } from '../utils';
import ButtonStyle from './button';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PositionBtnGroup = styled.div`
  position: absolute;
  right: 0;
  z-index: 10;
  max-width: 280px;
  animation: ${fadeIn} 0.3s;
  border-radius: 5px;
  padding: 10px 0;
  background-color: #F2F2F4;
`;

const Button = (view) => (item, key: string) => {
  const { state, dispatch } = view;
  return (<ButtonStyle
    style={{ backgroundColor: 'transparent' }}
    key={key}
    type={'button'}
    active={item.active && item.active(state)}
    title={item.title}
    disabled={item.enable && !item.enable(state)}
    onMouseDown={e => {
      e.preventDefault()
      item.onClick(state, dispatch, view)
    }}
  >{item.icon}</ButtonStyle>
)};

interface PositionProps {
  view: EditorView,
  offsetTop: number,
  menu: any
}

interface PositionState {
  style: React.CSSProperties;
}

export default class Menu extends React.Component<PositionProps, PositionState> {
  menuRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.state = {
      style: {
        right: 20,
        top: 0
      }
    }
    this.menuRef = React.createRef();
  }

  calculateStyle (props: PositionProps) {
    const { view, offsetTop } = this.props;
    const { state } = view;
    const { selection } = state;

    if (!selection) {
      return {
        right: -1000,
        top: 0
      }
    }

    const { $anchor } = selection;
    const resolvedPos = state.doc.resolve($anchor.pos) as any;
    const rowNumber = resolvedPos.path[1];
    let i = 0;
    const [ firstNode ] = findChildren(state.doc, (_node) => {
      if (rowNumber === i || rowNumber + 1 === i) {
        i++;
        return true;
      }
      i++;
      return false;
    }, false);

    if (!firstNode) {
      return {
        top: -1000
      }
    }

    const coords = view.coordsAtPos(firstNode.pos);
    const dom = view.nodeDOM(firstNode.pos) as HTMLElement;
    const elementTop = getOffset(dom).top;
    
    if (coords.top === 0) {
      return {
        top: -1000
      }
    } else {
      return {
        right: 20,
        top: elementTop - offsetTop - 50
      }
    }
  }

  componentDidMount () {
    this.setState({
      style: this.calculateStyle(this.props)
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      style: this.calculateStyle(nextProps)
    })
  }
 
  render() {
    const { style } = this.state;
    const { menu, view } = this.props;


    return (<PositionBtnGroup style={style} ref={this.menuRef}>
      {map(menu, (item, key) => (
        <span key={key}>
          {map(item, Button(view))}
        </span>
      ))}
    </PositionBtnGroup>)
  }
}