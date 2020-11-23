import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chat, CodeMirror, Room } from '@/components/editor';
import { Grid, Image, Button } from 'semantic-ui-react';

const Editor = ({ doc, match }) => {
  const [activeUser, setActiveUser] = useState(0);
  const [docText, setDocText] = useState('');
  const pageName = match.params.page;
  const roomName = doc ? null : pageName;
  const defaultValue = doc
    ? `loading ${pageName}...`
    : `syncing with ${pageName}...`;
  const docs = null;
  const [videoIsShowed, setVideoIsShowed] = useState('none');
  const [videoButton, setVideoButton] = useState(false);
  const [chatIsShowed, setChatIsShowed] = useState('none');
  const [chatButton, setChatButton] = useState(false);

  useEffect(() => {
    if (doc) {
      loadDoc(match.params.page);
    }
  }, [match]);

  const loadDoc = async pageName => {
    const mdFileName = docs[pageName];
    if (!mdFileName) {
      setDocText(`There is no document named '${pageName}'`);
      return;
    }
    setDocText(`loading ${pageName}...`);
    const res = await window.fetch(mdFileName);
    const text = await res.text();
    setDocText(text);
  };

  const handleActiveUserDisp = userNum => {
    setActiveUser(userNum);
  };

  const style = {
    header: {
      height: 33 + 4,
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      margin: 0,
      padding: 7,
      backgroundColor: '#F1F1F1',
      maxWidth: 'inherit',
    },
    headerLeft: {
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      marginLeft: '5px',
      marginRight: 'auto',
    },
    img: {
      display: 'block',
      margin: '0 auto',
      padding: 0,
    },
    pageName: {
      paddingLeft: '8px',
      fontSize: '24px',
    },
    active: {
      marginRight: '25px',
      fontSize: '18px',
    },
    editContainer: { // header + Editor
      display: 'block',
      width: '-webkit-fill-available',
    },
    editContent: { // only Editor
       width : '100%',
       display: 'flex',
    },
    contents: { //헤더 제외한 Editor + RTC 
      display: 'flex',
    },
    Container: { // 헤더 포함 Editor + RTC
      display: 'flex',
    },
  };

  const videoShowAndHide = () => {
    if (videoIsShowed === 'none') {
      setVideoIsShowed('inline');
      setVideoButton(true);

    } else {
      setVideoIsShowed('none');
      setVideoButton(false);
    }
  };

  const chatShowAndHide = () => {
    if (chatIsShowed === 'none') {
      setChatIsShowed('inline');
      setChatButton(true);
    } else {
      setChatIsShowed('none');
      setChatButton(false);
    }
  };

  return (
    <React.Fragment>
      <div style={style.Container}>
        <div style={style.editContainer}>
          <div style={style.header}>
            <div style={style.headerLeft}>
              <div style={style.pageName}>{pageName}</div>
            </div>

            <Button color='black' onClick={videoShowAndHide}>
              {videoButton ? 'Hide Video' : 'Show Video'}
            </Button>
            <Button color='black' onClick={chatShowAndHide}>
              {chatButton ? 'Hide Chat' : 'Show Chat'}
            </Button>

            {activeUser > 0 ? (
              <div style={style.active}>{`(active: ${activeUser})`}</div>
            ) : null}
          </div>
          <div style={style.contents}>
              <div style={{ // Editor(header제외) 길이 맞춰주기
                ...style.editContent,
                width: videoButton ? '85%' : '100%' &&
                chatButton ? '85%' : '100%'}}>
                <CodeMirror
                  key={`page/${pageName}`}
                  roomName={roomName}
                  defaultValue={defaultValue}
                  value={docText}
                  heightMargin={style.header.height + style.header.padding * 2}
                  onActiveUser={handleActiveUserDisp}
                  videoButton={videoButton}
                  chatButton={chatButton}
                />
              </div>
              <div className='RTC'>
                <Room videoIsShowed={videoIsShowed} />
                <Chat chatIsShowed={chatIsShowed} /> 
              </div>
          </div>
        </div>    
      </div>
    </React.Fragment>
  );
};

Editor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  doc: PropTypes.bool,
};
Editor.defaultProps = {
  doc: false,
};

export default Editor;
