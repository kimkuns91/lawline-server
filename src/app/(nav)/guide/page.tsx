import React from 'react';

const GuidePage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>질문 작성 가이드</h1>
      
      <section style={{ marginBottom: '20px' }}>
        <h2>질문 작성 가이드라인</h2>
        <p>
          <strong>명확하고 구체적으로 작성하기:</strong> 질문이 명확하고 구체적일수록 AI가 더 정확한 답변을 제공할 수 있습니다.
          예를 들어, &quot;계약서 문제&quot; 대신 &quot;임대 계약서에서 임차인의 권리에 대해 문의하고 싶습니다&quot;와 같이 작성합니다.
        </p>
        <p>
          <strong>배경 정보 제공하기:</strong> 상황에 대한 배경 정보를 제공하면 AI가 상황을 더 잘 이해할 수 있습니다.
          예를 들어, &quot;임대 계약서에서 문제가 생겼습니다&quot; 대신 &quot;임대 계약서를 작성했는데, 계약 종료 시 임차인의 권리에 대해 궁금합니다.
          계약서에 &quot;조기 해지&quot; 조항이 있습니다&quot;라고 작성합니다.
        </p>
        <p>
          <strong>구체적인 질문하기:</strong> 한 번에 여러 질문을 하기보다, 하나의 구체적인 질문을 하는 것이 더 좋습니다.
          예를 들어, &quot;계약서의 여러 조항이 궁금합니다&quot; 대신 &quot;조기 해지 조항에 대한 법적 효력이 궁금합니다&quot;라고 작성합니다.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>예시 질문</h2>
        <p>
          <strong>상황 설명:</strong> &quot;저는 현재 아파트 임대 계약을 맺고 있습니다. 계약서에는 조기 해지 조항이 포함되어 있습니다.&quot;
        </p>
        <p>
          <strong>구체적인 질문:</strong> &quot;조기 해지 조항이 법적으로 효력이 있는지 궁금합니다. 만약 효력이 있다면, 어떤 조건 하에서 유효한가요?&quot;
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>질문 작성 팁</h2>
        <p>
          <strong>법률 용어 사용하기:</strong> 질문에 법률 용어를 사용하면 더 정확한 답변을 얻을 수 있습니다.
          예를 들어, &quot;임차인의 권리&quot; 대신 &quot;임차인의 법적 권리&quot;라고 작성합니다.
        </p>
        <p>
          <strong>문장 간결하게 유지하기:</strong> 질문을 너무 길게 작성하지 않도록 합니다. 간결하면서도 필요한 정보를 포함하도록 합니다.
        </p>
        <p>
          <strong>중복된 정보 피하기:</strong> 동일한 정보를 반복하지 않도록 주의합니다.
          예를 들어, &quot;임대 계약서에 임차인의 권리에 대해 궁금합니다. 계약서에서 임차인의 권리에 대해 문의합니다&quot; 대신
          &quot;임대 계약서의 임차인의 권리에 대해 궁금합니다&quot;라고 작성합니다.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>자주 묻는 질문(FAQ)</h2>
        <p>
          <strong>계약서 조항이 유효한가요?</strong>
          <br />답변 예시: &quot;계약서의 조항이 유효한지 여부는 해당 조항의 내용과 관련 법률에 따라 다릅니다.
          일반적으로, 계약서 조항이 법률에 반하지 않고 양 당사자가 동의한 경우 유효합니다.&quot;
        </p>
        <p>
          <strong>임대차 계약의 해지 조건은 무엇인가요?</strong>
          <br />답변 예시: &quot;임대차 계약의 해지 조건은 계약서에 명시된 내용과 관련 법률에 따라 달라집니다.
          계약서에 해지 조건이 명시되어 있다면, 그 조건에 따라 계약을 해지할 수 있습니다.&quot;
        </p>
      </section>
    </div>
  );
}

export default GuidePage;
