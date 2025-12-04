import React, { useState } from 'react';
import { X, Mail, Lock, User, CheckCircle, Clock, Users, Star } from 'lucide-react';
import { Course } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-stone-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onClose();
      alert(isLogin ? "欢迎回来，冥想者！" : "注册成功！开始您的养生之旅吧。");
    }, 1000);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="absolute top-4 right-4 cursor-pointer text-stone-400 hover:text-stone-600" onClick={onClose}>
          <X className="h-6 w-6" />
        </div>
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3 className="text-2xl leading-6 font-bold text-stone-900 mb-2" id="modal-title">
              {isLogin ? '欢迎回到 ZenFlow' : '加入 ZenFlow'}
            </h3>
            <p className="text-sm text-stone-500 mb-6">
              {isLogin ? '登录以继续您的冥想课程与进度追踪。' : '创建一个免费账户，开启您的身心疗愈之旅。'}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-stone-400" />
                  </div>
                  <input type="text" className="block w-full pl-10 pr-3 py-3 border border-stone-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="您的姓名" required />
                </div>
              )}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400" />
                </div>
                <input type="email" className="block w-full pl-10 pr-3 py-3 border border-stone-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="电子邮箱" required />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400" />
                </div>
                <input type="password" className="block w-full pl-10 pr-3 py-3 border border-stone-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="密码" required />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-colors"
              >
                {loading ? '处理中...' : (isLogin ? '立即登录' : '免费注册')}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? '还没有账号？立即注册' : '已有账号？立即登录'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, isOpen, onClose }) => {
  if (!course) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <img className="h-56 w-full object-cover" src={course.imageUrl} alt={course.title} />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-1 cursor-pointer text-stone-600 hover:text-stone-900" onClick={onClose}>
          <X className="h-5 w-5" />
        </div>
      </div>
      <div className="px-6 py-6 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 mb-2">
              {course.category === 'free' ? '免费体验' : course.category === 'basic' ? '基础课程' : '高阶训练营'}
            </span>
            <h3 className="text-2xl font-bold text-stone-900">{course.title}</h3>
            <p className="text-sm text-stone-500 mt-1">导师：{course.instructor}</p>
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-bold text-yellow-700">{course.rating}</span>
          </div>
        </div>

        <div className="mt-4 border-t border-stone-100 pt-4">
          <p className="text-stone-600 leading-relaxed">{course.description}</p>
          <p className="mt-2 text-stone-600">本课程专为希望改善身心状态的学员设计，结合了传统智慧与现代科学方法。</p>
        </div>

        <div className="mt-6 flex items-center justify-between text-stone-500 bg-stone-50 p-4 rounded-xl">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-teal-600" />
            <span className="text-sm font-medium">{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-teal-600" />
            <span className="text-sm font-medium">{course.students} 人已加入</span>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => {
              onClose();
              alert(`您已成功加入课程：${course.title}`);
            }}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            开始学习
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
