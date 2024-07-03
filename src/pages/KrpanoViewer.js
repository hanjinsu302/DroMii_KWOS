import React, { useEffect, useRef } from 'react';

const KrpanoViewer = ({ xmlPath }) => {
  const viewerRef = useRef(null);
  const viewerId = useRef(`krpanoViewer-${Math.random().toString(36).substr(2, 9)}`);
  const isViewerLoaded = useRef(false);

  useEffect(() => {
    const loadKrpano = () => {
      // 뷰어가 이미 존재하면 제거합니다.
      if (window.removepano && document.getElementById(viewerId.current)) {
        window.removepano(viewerId.current);
      }

      if (window.embedpano) {
        window.embedpano({
          swf: null,
          id: viewerId.current,
          xml: xmlPath,
          target: viewerRef.current,
          html5: "only",
          passQueryParameters: true,
        });
        isViewerLoaded.current = true;
      }
    };

    // krpano.js가 로드되었는지 확인
    if (document.readyState === 'complete') {
      loadKrpano();
    } else {
      window.addEventListener('load', loadKrpano);
      return () => window.removeEventListener('load', loadKrpano);
    }

    return () => {
      // 뷰어가 존재할 때만 removepano 호출
      if (window.removepano && document.getElementById(viewerId.current)) {
        window.removepano(viewerId.current);
        isViewerLoaded.current = false;
      }
    };
  }, [xmlPath]);

  return <div ref={viewerRef} style={{ width: '100%', height: '100%' }} />;
};

export default KrpanoViewer;
