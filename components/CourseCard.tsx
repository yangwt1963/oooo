import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'bootcamp': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category: string) => {
     switch (category) {
      case 'free': return '免费体验';
      case 'basic': return '基础入门';
      case 'bootcamp': return '进阶训练营';
      default: return '课程';
    }
  }

  return (
    <div className="flex flex-col rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="flex-shrink-0 relative">
        <img className="h-48 w-full object-cover" src={course.imageUrl} alt={course.title} />
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getBadgeColor(course.category)}`}>
          {getCategoryName(course.category)}
        </span>
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-teal-600">
              {course.instructor}
            </p>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-stone-500">{course.rating}</span>
            </div>
          </div>
          <a href="#" className="block mt-2">
            <p className="text-xl font-semibold text-stone-900 group-hover:text-teal-600 transition-colors">{course.title}</p>
            <p className="mt-3 text-base text-stone-500 line-clamp-2">{course.description}</p>
          </a>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center text-sm text-stone-500">
            <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-stone-400" />
            <p>{course.duration}</p>
          </div>
          <div className="flex items-center text-sm text-stone-500">
            <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-stone-400" />
            <p>{course.students} 人在学</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-stone-100 text-stone-800 font-medium py-2 px-4 rounded-lg hover:bg-stone-200 transition-colors">
          查看详情
        </button>
      </div>
    </div>
  );
};

export default CourseCard;