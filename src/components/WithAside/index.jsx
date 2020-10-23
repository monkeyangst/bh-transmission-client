import React from 'react';

const WithAside = (props) => {
  let mainWidth = '100%';
  let asideWidth = '0';

  if (props.showAside) {
    mainWidth = '75%';
    asideWidth = '25%';
  }
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: mainWidth }}>{props.children}</div>
      <aside
        style={{
          width: asideWidth,
          display: props.showAside ? 'block' : 'none',
        }}
      >
        {props.aside}
      </aside>
    </div>
  );
};

export default WithAside;
