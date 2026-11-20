window.OFFER_CONFIG={
  mode:'private',client:'리틀포레스트',type:'private-client-proposal',
  operation:'월 120만 원 × 6개월 = 720만 원 (VAT 별도 제안 가안)',
  extraNotice:'광고 매체비·호스팅·도메인·신규 촬영·출장·외부 도구·VAT 별도 협의. 계약 미확정.',
  references:{essential:[['ARVO HOTEL · 객실 선택','https://arvosacheon.netlify.app/'],['다로산 · 단체 대관','https://darosan.com/group-workshop/']]},
  pricing:{
    signature:{label:'브랜드 경험형 · 별도 견적',extra:'별도 견적',note:'단독 구축 1,000만 원부터의 내부 기획 기준. 실제 요구사항과 작업 수량을 확인 후 견적.',total:'개별 견적',totalNote:'운영비 720만 원 외에 맞춤 구축 범위를 별도로 산정. VAT·광고·호스팅 등 실비 별도.',summary:'맞춤 제작비 별도 견적'},
    group:{label:'통대관 전환형 · 고도화',extra:'+300만~600만 원',note:'기본 안내형 1페이지가 운영 계약에 포함되는 경우의 확장 구축비 검토 범위.',total:'1,020만~1,320만 원',totalNote:'6개월 운영비 720만 원 + 기본형 포함 시 추가 제작비 300만~600만 원. VAT 및 별도 실비 제외.',summary:'기본형 포함 계약에서 추가 300만~600만 원 검토'},
    essential:{label:'공식 안내형 · 시작점',extra:'추가 0원',note:'6개월 운영 제안에 기본 안내형 1페이지 1회 제작 포함을 전제로 한 금액. 단독 제작 기준 150만 원은 참고용.',total:'720만 원',totalNote:'6개월 운영비만 합산한 금액. 1페이지 포함 범위, VAT·광고비·호스팅·촬영은 계약 전 확정.',summary:'기본형 1회 포함 전제, 추가 구축비 0원'}
  },
  formatSummary(g,t,k,goal){return `WEPLACE × LITTLE FOREST | 미팅용 선택 요약
관심 고객군: ${g.label}
우선 검토 목적: ${goal || '아직 선택하지 않음'}
홈페이지 수준: ${t.label}
6개월 운영: ${this.operation}
홈페이지 추가 구축: ${this.pricing[k].summary}
별도 항목: ${this.extraNotice}
다음 행동: 실제 운영 사례 확인 → 현장 방문 → 업무 수량 및 총비용 확정 협의
계약/수금 미확정. 자동 전송되지 않음.`;}
};
