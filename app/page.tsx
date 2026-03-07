import React from 'react';

export default function Resume() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.6', color: '#333', maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      {/* 头部 */}
      <header style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Xu Junshan</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>全栈开发工程师 / Java & Next.js 开发者</p>
        <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#888' }}>
          📧 Jun3xu@gmail.com | 🌐 xj3.tech
        </div>
      </header>

      {/* 简介 */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', borderLeft: '4px solid #0070f3', paddingLeft: '10px', marginBottom: '15px' }}>个人简介</h2>
        <p>
          具备扎实的 Java 后端开发基础与现代前端工程化能力。热衷于探索前沿技术，能够独立完成从后端架构（Spring Boot）到前端部署（Next.js + Vercel）的全栈开发流程。拥有极强的快速学习能力与问题解决能力。
        </p>
      </section>

      {/* 技能 */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', borderLeft: '4px solid #0070f3', paddingLeft: '10px', marginBottom: '15px' }}>专业技能</h2>
        <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            <strong>后端技术：</strong> Java 基础扎实，理解底层原理（HashMap、JUC、JVM）；熟练应用主流企业级框架（Spring Boot、MyBatis），理解 IoC/AOP 思想与 RESTful 规范。
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>数据与架构：</strong> 熟悉数据库（MySQL），掌握索引原理与 SQL 优化；熟悉主流中间件（Redis、RabbitMQ），了解缓存雪崩/击穿等高并发方案及异步解耦。
          </li>
          <li>
            <strong>工程与综合素质：</strong> 掌握自动化部署工作流（Git、Linux、Docker、Vercel CI/CD）；外语极佳（CET-6 538分、日语 N3），熟练运用 AI IDE（Trae/Claude）大幅提升研发与排错效能。
          </li>
        </ul>
      </section>

      {/* 语言 */}
      <section>
        <h2 style={{ fontSize: '1.5rem', borderLeft: '4px solid #0070f3', paddingLeft: '10px', marginBottom: '15px' }}>语言能力</h2>
        <p>
          <span style={{ display: 'inline-block', background: '#eef2ff', color: '#4f46e5', padding: '5px 10px', borderRadius: '15px', marginRight: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>英语 CET-6 (538分)</span>
          <span style={{ display: 'inline-block', background: '#f5f3ff', color: '#7c3aed', padding: '5px 10px', borderRadius: '15px', fontSize: '0.9rem', fontWeight: 'bold' }}>日语 N3</span>
        </p>
      </section>
      
      <footer style={{ marginTop: '50px', borderTop: '1px solid #eaeaea', paddingTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: '#aaa' }}>
        © 2026 Xu Junshan. All Rights Reserved.
      </footer>
    </div>
  );
}