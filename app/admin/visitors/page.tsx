'use client';

import { useState } from 'react';

type VisitorRecord = {
  timestamp: string;
  ip: string;
  country: string;
  city: string;
  browser: string;
  os: string;
  userAgent: string;
};

export default function AdminVisitorsPage() {
  const [secret, setSecret] = useState('');
  const [logs, setLogs] = useState<VisitorRecord[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/visitor?secret=${encodeURIComponent(secret)}`);
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Failed to fetch logs');
      } else {
        // data.logs 是一个包含 JSON 字符串的数组
        const parsedLogs = data.logs.map((log: string | VisitorRecord) => 
          typeof log === 'string' ? JSON.parse(log) : log
        );
        setLogs(parsedLogs);
      }
    } catch (err) {
      setError('An error occurred while fetching logs');
    } finally {
      setLoading(false);
    }
  };

  if (logs) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8 text-slate-800 dark:text-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">访客记录 (Visitor Logs)</h1>
            <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
              共 {logs.length} 条记录
            </span>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-100 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 font-semibold">访问时间</th>
                  <th className="px-6 py-4 font-semibold">位置</th>
                  <th className="px-6 py-4 font-semibold">设备与浏览器</th>
                  <th className="px-6 py-4 font-semibold">IP 地址</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {logs.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-6 py-4">
                      {new Date(log.timestamp).toLocaleString('zh-CN', { 
                        year: 'numeric', month: '2-digit', day: '2-digit', 
                        hour: '2-digit', minute: '2-digit', second: '2-digit' 
                      })}
                    </td>
                    <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">
                      {log.country} {log.city !== 'Unknown' ? `- ${log.city}` : ''}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded mr-2">{log.os}</span>
                      <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{log.browser}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {log.ip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {logs.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                暂无访客记录
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-4">
            🔒
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">管理后台</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">请输入管理员密钥以查看访客记录</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); fetchLogs(); }} className="space-y-4">
          <div>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Admin Secret..."
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          {error && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !secret}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '验证中...' : '进入控制台'}
          </button>
        </form>
      </div>
    </div>
  );
}
