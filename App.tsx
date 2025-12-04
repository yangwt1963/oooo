import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCard from './components/CourseCard';
import AICoach from './components/AICoach';
import { Course, CourseCategory } from './types';
import { Leaf, Award, Heart, Mail, Sun, Coffee, Moon } from 'lucide-react';

// Mock Data
const COURSES: Course[] = [
  {
    id: '1',
    title: '7天冥想入门：重获专注',
    description: '每天10分钟，从零开始学习呼吸与觉察，适合完全没有经验的初学者。',
    category: 'free',
    duration: '10 分钟/天',
    instructor: '李安心',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    rating: 4.9,
    students: 12500,
  },
  {
    id: '2',
    title: '深度睡眠引导',
    description: '结合白噪音与身体扫描技术，帮助你快速进入深度睡眠，改善失眠困扰。',
    category: 'free',
    duration: '25 分钟',
    instructor: 'Dr. Chen',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    rating: 4.8,
    students: 8900,
  },
  {
    id: '3',
    title: '正念减压基础课 (MBSR)',
    description: '基于科学的正念减压疗法，系统性缓解职场焦虑与生活压力。',
    category: 'basic',
    duration: '4 周',
    instructor: 'Sarah Wang',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    rating: 4.9,
    students: 3400,
  },
  {
    id: '4',
    title: '中医经络与呼吸法',
    description: '探索传统养生智慧，通过特定呼吸法疏通经络，提升生命能量。',
    category: 'basic',
    duration: '15 课时',
    instructor: '张中医师',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    rating: 5.0,
    students: 2100,
  },
  {
    id: '5',
    title: '21天静修训练营：内在觉醒',
    description: '高强度沉浸式训练，包含早课、晚课与一对一导师指导，彻底重塑心态。',
    category: 'bootcamp',
    duration: '21 天',
    instructor: 'Master Lin',
    imageUrl: 'https://picsum.photos/400/300?random=5',
    rating: 5.0,
    students: 500,
  },
  {
    id: '6',
    title: '情绪管理高阶工坊',
    description: '深入潜意识，处理积压情绪，学习如何与情绪共处。',
    category: 'bootcamp',
    duration: '2 天周末',
    instructor: '心理学家 Emma',
    imageUrl: 'https://picsum.photos/400/300?random=6',
    rating: 4.7,
    students: 800,
  },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('all');

  const filteredCourses = selectedCategory === 'all' 
    ? COURSES 
    : COURSES.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <Navbar />
      
      <Hero />

      {/* Wellness Wisdom Section - NEW */}
      <section className="py-12 bg-teal-50/50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-teal-800">每日养生智慧</h2>
              <p className="mt-2 text-stone-600">顺应自然节奏，找回身体的内在秩序</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center mb-4">
                    <div className="p-2 bg-orange-100 rounded-full text-orange-600 mr-3">
                       <Sun className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-stone-800">晨间唤醒</h3>
                 </div>
                 <p className="text-stone-600 text-sm leading-relaxed">一日之计在于晨。醒后饮一杯温水，做五分钟的拉伸或冥想，唤醒身体能量。</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center mb-4">
                    <div className="p-2 bg-green-100 rounded-full text-green-600 mr-3">
                       <Coffee className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-stone-800">饮食有节</h3>
                 </div>
                 <p className="text-stone-600 text-sm leading-relaxed">细嚼慢咽，七分饱足。多食当季蔬果，少食生冷油腻，滋养脾胃。</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center mb-4">
                    <div className="p-2 bg-indigo-100 rounded-full text-indigo-600 mr-3">
                       <Moon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-stone-800">子午觉</h3>
                 </div>
                 <p className="text-stone-600 text-sm leading-relaxed">中午小憩养心，晚上早睡养肝。保证充足的深度睡眠是最好的补药。</p>
              </div>
           </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">为什么选择 ZenFlow</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-stone-900 sm:text-4xl">
              科学养生，重塑身心
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Leaf className="h-8 w-8" />
                </div>
                <h3 className="text-lg leading-6 font-medium text-stone-900">自然疗法</h3>
                <p className="mt-2 text-base text-stone-500">
                  结合自然声音与环境心理学，让你足不出户感受大自然的治愈力。
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-lg leading-6 font-medium text-stone-900">身心合一</h3>
                <p className="mt-2 text-base text-stone-500">
                  不仅仅是冥想，更是涵盖饮食、睡眠、运动的全方位养生方案。
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-lg leading-6 font-medium text-stone-900">专业认证</h3>
                <p className="mt-2 text-base text-stone-500">
                  所有课程均由认证冥想导师与中医师联合开发，科学有效。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Section */}
      <section className="py-16 bg-stone-50" id="courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-stone-900">精选课程</h2>
            
            {/* Category Filter */}
            <div className="mt-4 md:mt-0 flex space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {(['all', 'free', 'basic', 'bootcamp'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {cat === 'all' && '全部'}
                  {cat === 'free' && '免费体验'}
                  {cat === 'basic' && '基础入门'}
                  {cat === 'bootcamp' && '训练营'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-500 text-lg">暂无该分类课程</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / Footer CTA */}
      <section className="bg-teal-800" id="community">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">准备好开始了吗？</span>
            <span className="block text-teal-200">加入我们的养生社区。</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50"
              >
                免费注册
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-lg font-bold mb-4">ZenFlow 禅悦</h3>
            <p className="text-sm leading-6 max-w-xs">
              致力于为您提供最优质的冥想与养生体验，帮助现代人找回内心的宁静与身体的健康。
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">链接</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
              <li><a href="#" className="hover:text-white transition-colors">课程列表</a></li>
              <li><a href="#" className="hover:text-white transition-colors">师资力量</a></li>
              <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">联系</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><Mail className="h-4 w-4 mr-2"/> contact@zenflow.com</li>
              <li>北京市朝阳区冥想大道88号</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t border-stone-800 pt-8 text-sm text-center">
          &copy; 2023 ZenFlow Inc. All rights reserved.
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AICoach />
    </div>
  );
}

export default App;