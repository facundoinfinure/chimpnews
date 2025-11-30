
import React, { useState } from 'react';
import { ChannelConfig, CharacterProfile } from '../types';

interface AdminDashboardProps {
  config: ChannelConfig;
  onUpdateConfig: (newConfig: ChannelConfig) => void;
  onExit: () => void;
}

const CharacterEditor: React.FC<{
  profile: CharacterProfile;
  onChange: (p: CharacterProfile) => void;
  label: string;
}> = ({ profile, onChange, label }) => {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] space-y-3">
      <h4 className="text-yellow-500 font-bold uppercase text-sm border-b border-[#333] pb-2">{label}</h4>
      
      <div>
        <label className="text-xs text-gray-500 block mb-1">Name</label>
        <input 
          type="text" value={profile.name} 
          onChange={(e) => onChange({...profile, name: e.target.value})}
          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-sm text-white"
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Bio / Politics</label>
        <textarea 
          value={profile.bio} 
          onChange={(e) => onChange({...profile, bio: e.target.value})}
          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-sm text-white h-16"
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Visual Prompt (Veo)</label>
        <textarea 
          value={profile.visualPrompt} 
          onChange={(e) => onChange({...profile, visualPrompt: e.target.value})}
          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-sm text-white h-20"
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Voice ID</label>
        <select 
          value={profile.voiceName} 
          onChange={(e) => onChange({...profile, voiceName: e.target.value})}
          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-sm text-white"
        >
          <option value="Puck">Puck (Male, Soft)</option>
          <option value="Charon">Charon (Male, Deep)</option>
          <option value="Kore">Kore (Female, Calm)</option>
          <option value="Fenrir">Fenrir (Male, Intense)</option>
          <option value="Zephyr">Zephyr (Female, Bright)</option>
        </select>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ config, onUpdateConfig, onExit }) => {
  const [tempConfig, setTempConfig] = useState<ChannelConfig>(config);
  const [activeTab, setActiveTab] = useState<'insights' | 'settings'>('insights');

  const handleSave = () => {
    onUpdateConfig(tempConfig);
    alert("Configuration Saved!");
  };

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-[#333] pb-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Manage production settings and analyze performance</p>
          </div>
          <div className="flex gap-4">
            <button onClick={onExit} className="text-gray-400 hover:text-white">Exit to App</button>
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full font-bold">Save Changes</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-8">
          <button 
            onClick={() => setActiveTab('insights')} 
            className={`pb-2 border-b-2 font-medium ${activeTab === 'insights' ? 'border-blue-500 text-white' : 'border-transparent text-gray-500'}`}
          >
            Performance Insights
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`pb-2 border-b-2 font-medium ${activeTab === 'settings' ? 'border-blue-500 text-white' : 'border-transparent text-gray-500'}`}
          >
            Production Settings
          </button>
        </div>

        {/* INSIGHTS TAB */}
        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-3 bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
               <h3 className="font-bold text-lg mb-4">Channel Performance (Last 30 Days)</h3>
               <div className="h-40 flex items-end justify-between gap-2">
                  {[40, 65, 30, 80, 55, 90, 45, 70, 60, 95].map((h, i) => (
                    <div key={i} className="bg-blue-900/50 w-full rounded-t hover:bg-blue-600 transition-all relative group" style={{height: `${h}%`}}>
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          {h * 123} views
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
               <h3 className="font-bold text-gray-400 text-xs uppercase mb-2">Total Views</h3>
               <div className="text-4xl font-bold">1,240,593</div>
               <div className="text-green-500 text-sm mt-1">↑ 12% vs last month</div>
            </div>
            
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
               <h3 className="font-bold text-gray-400 text-xs uppercase mb-2">Avg. Retention</h3>
               <div className="text-4xl font-bold">84.2%</div>
               <div className="text-green-500 text-sm mt-1">Top performing: "Sarcastic" tone</div>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
               <h3 className="font-bold text-gray-400 text-xs uppercase mb-2">Viral Hit Rate</h3>
               <div className="text-4xl font-bold">3/10</div>
               <div className="text-gray-500 text-sm mt-1">Videos > 100k views</div>
            </div>
            
            <div className="col-span-1 md:col-span-3 bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                <h3 className="font-bold text-lg mb-4">AI Improvements Suggestions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                     <span className="text-yellow-500">💡</span>
                     <span className="text-sm text-gray-300">Audience retention drops at 0:45 when using "Host B". Consider making their dialogue punchier or increasing cut speed.</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <span className="text-yellow-500">💡</span>
                     <span className="text-sm text-gray-300">"Sarcastic" tone videos perform 40% better than "Serious" tone. Recommendation: Increase sarcasm setting.</span>
                  </li>
                </ul>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            
            {/* General Settings */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <span className="text-yellow-500">📺</span> Channel Branding
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Channel Name</label>
                  <input type="text" value={tempConfig.channelName} onChange={e => setTempConfig({...tempConfig, channelName: e.target.value})} className="w-full bg-[#111] border border-[#333] p-2 rounded text-white"/>
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Tagline</label>
                  <input type="text" value={tempConfig.tagline} onChange={e => setTempConfig({...tempConfig, tagline: e.target.value})} className="w-full bg-[#111] border border-[#333] p-2 rounded text-white"/>
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Primary Color (Hex)</label>
                  <div className="flex gap-2">
                    <input type="color" value={tempConfig.logoColor1} onChange={e => setTempConfig({...tempConfig, logoColor1: e.target.value})} className="h-10 w-10 bg-transparent border-none"/>
                    <input type="text" value={tempConfig.logoColor1} onChange={e => setTempConfig({...tempConfig, logoColor1: e.target.value})} className="w-full bg-[#111] border border-[#333] p-2 rounded text-white"/>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Secondary Color (Hex)</label>
                  <div className="flex gap-2">
                    <input type="color" value={tempConfig.logoColor2} onChange={e => setTempConfig({...tempConfig, logoColor2: e.target.value})} className="h-10 w-10 bg-transparent border-none"/>
                    <input type="text" value={tempConfig.logoColor2} onChange={e => setTempConfig({...tempConfig, logoColor2: e.target.value})} className="w-full bg-[#111] border border-[#333] p-2 rounded text-white"/>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Strategy */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <span className="text-blue-500">🌍</span> Content Strategy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <label className="text-sm text-gray-400 block mb-1">Target Country</label>
                    <input type="text" value={tempConfig.country} onChange={e => setTempConfig({...tempConfig, country: e.target.value})} className="w-full bg-[#111] border border-[#333] p-2 rounded text-white"/>
                 </div>
                 <div>
                    <label className="text-sm text-gray-400 block mb-1">Language</label>
                    <select value={tempConfig.language} onChange={e => setTempConfig({...tempConfig, language: e.target.value})} className="w-full bg-[#111] border border-[#333] p-2 rounded text-white">
                       <option value="English">English</option>
                       <option value="Spanish">Spanish</option>
                       <option value="Portuguese">Portuguese</option>
                       <option value="French">French</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-sm text-gray-400 block mb-1">Overall Tone</label>
                    <input type="text" value={tempConfig.tone} onChange={e => setTempConfig({...tempConfig, tone: e.target.value})} className="w-full bg-[#111] border border-[#333] p-2 rounded text-white"/>
                 </div>
                 <div>
                    <label className="text-sm text-gray-400 block mb-1">Video Format</label>
                    <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="format" checked={tempConfig.format === '16:9'} onChange={() => setTempConfig({...tempConfig, format: '16:9'})} />
                            Landscape (16:9)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="format" checked={tempConfig.format === '9:16'} onChange={() => setTempConfig({...tempConfig, format: '9:16'})} />
                            Shorts (9:16)
                        </label>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 mt-6">
                    <input type="checkbox" checked={tempConfig.captionsEnabled} onChange={e => setTempConfig({...tempConfig, captionsEnabled: e.target.checked})} className="w-5 h-5"/>
                    <label className="text-sm text-white">Enable Auto-Captions</label>
                 </div>
              </div>
            </div>

            {/* Characters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <CharacterEditor 
                  label="Host A (Left)" 
                  profile={tempConfig.characters.hostA} 
                  onChange={(p) => setTempConfig({...tempConfig, characters: {...tempConfig.characters, hostA: p}})}
               />
               <CharacterEditor 
                  label="Host B (Right)" 
                  profile={tempConfig.characters.hostB} 
                  onChange={(p) => setTempConfig({...tempConfig, characters: {...tempConfig.characters, hostB: p}})}
               />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
