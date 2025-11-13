import React, { useState, useCallback, useMemo } from 'react';
import { Page, ApplicationFormData, FormErrors } from './types';
import { StarIcon, UsersIcon, ShieldCheckIcon, SupportIcon, ArrowLeftIcon } from './components/icons';

const SALON_NAME = "Elite Agency";

type NavigateTo = (page: Page) => void;

// --- Header Component ---
interface HeaderProps {
  currentPage: Page;
  navigateTo: NavigateTo;
}
const Header: React.FC<HeaderProps> = ({ currentPage, navigateTo }) => {
  const navItems = [
    { page: Page.Home, label: 'Главная' },
    { page: Page.About, label: 'О нас' },
    { page: Page.Apply, label: 'Подать заявку' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-amber-300 tracking-wider">{SALON_NAME}</h1>
        <nav className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => navigateTo(item.page)}
              className={`text-lg transition-colors duration-300 ${
                currentPage === item.page
                  ? 'text-amber-300 border-b-2 border-amber-300'
                  : 'text-white hover:text-amber-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};


// --- Main Application Component ---
export default function App() {
  const [page, setPage] = useState<Page>(Page.Home);
  const [animationClass, setAnimationClass] = useState('opacity-100');

  const navigateTo: NavigateTo = useCallback((newPage: Page) => {
    if (page === newPage) return;
    setAnimationClass('opacity-0');
    setTimeout(() => {
        setPage(newPage);
        setAnimationClass('opacity-100');
    }, 300); // This duration should match the CSS transition
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case Page.Home:
        return <HomePage navigateTo={navigateTo} />;
      case Page.About:
        return <AboutPage navigateTo={navigateTo} />;
      case Page.Apply:
        return <ApplyPage navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header currentPage={page} navigateTo={navigateTo} />
      <main className={`transition-opacity duration-300 ease-in-out ${animationClass}`}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

// --- Page Components ---

const HomePage = ({ navigateTo }: { navigateTo: NavigateTo; }) => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515098523293-27c61b175276?q=80&w=1920&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div className="relative z-20 p-8">
            <h2 className="text-6xl md:text-8xl font-bold mb-4 tracking-widest text-amber-200" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>{SALON_NAME}</h2>
            <p className="text-xl md:text-2xl mb-8 font-light text-gray-200">Откройте для себя мир роскоши и возможностей</p>
            <button
                onClick={() => navigateTo(Page.About)}
                className="bg-amber-400 text-gray-900 font-bold py-3 px-10 text-lg rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/20"
            >
                Узнать больше
            </button>
        </div>
    </div>
  );
};

const AboutPage = ({ navigateTo }: { navigateTo: NavigateTo; }) => {
  const advantages = [
    { icon: StarIcon, title: "10+ лет опыта", description: "Мы являемся лидерами на рынке элитного досуга более десяти лет." },
    { icon: UsersIcon, title: "Большая база клиентов", description: "Наши постоянные и состоятельные клиенты ценят качество и сервис." },
    { icon: SupportIcon, title: "Поддержка 24/7", description: "Наша команда всегда на связи, чтобы обеспечить вашу комфортную работу." },
    { icon: ShieldCheckIcon, title: "Безопасность и забота", description: "Собственная охрана и личные водители для вашей полной безопасности." },
  ];

  return (
    <div className="py-24 pt-32 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
         <div className="mb-8">
            <button
                onClick={() => navigateTo(Page.Home)}
                className="flex items-center space-x-2 text-gray-400 hover:text-amber-300 transition-colors duration-300 group"
                aria-label="На главную"
            >
                <ArrowLeftIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>На главную</span>
            </button>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-amber-300">Наши Преимущества</h2>
          <p className="text-lg mt-4 text-gray-300 max-w-3xl mx-auto">
            Мы создали идеальные условия для работы, где каждая девушка чувствует себя защищенной, ценной и может реализовать свой потенциал без каких-либо забот.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {advantages.map((adv, index) => (
            <div key={index} className="flex items-start space-x-6 p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-amber-400 transition-colors duration-300">
              <adv.icon className="w-12 h-12 text-amber-400 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-amber-300">{adv.title}</h3>
                <p className="text-gray-300 mt-2">{adv.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold text-white mb-4">Работа без штрафов и вычетов</h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">Мы ценим ваш труд. Вся ваша заработная плата остается у вас. Мы гарантируем полную прозрачность и честность.</p>
          <button
            onClick={() => navigateTo(Page.Apply)}
            className="bg-amber-400 text-gray-900 font-bold py-3 px-10 text-lg rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/20"
          >
            Присоединиться к нам
          </button>
        </div>
      </div>
    </div>
  );
};

const ApplyPage = ({ navigateTo }: { navigateTo: NavigateTo; }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({ name: '', age: '', city: '', phone: '', telegram: '' });
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = useCallback(() => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно для заполнения';
    if (!formData.city.trim()) newErrors.city = 'Город обязателен для заполнения';
    
    const ageNum = parseInt(formData.age);
    if (!formData.age) newErrors.age = 'Возраст обязателен для заполнения';
    else if (isNaN(ageNum) || ageNum < 18) newErrors.age = 'Вам должно быть 18 или больше лет';
    
    const phoneRegex = /^\+380\d{9}$/;
    if (!formData.phone) newErrors.phone = 'Номер телефона обязателен';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Введите номер в формате +380XXXXXXXXX';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const canSubmit = useMemo(() => {
    const ageNum = parseInt(formData.age);
    return formData.name && formData.city && formData.phone && !isNaN(ageNum) && ageNum >= 18;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      })
        .then(() => setIsSubmitted(true))
        .catch((error) => alert(error));
      
      console.log('Form Submitted:', { ...formData, photo: photo?.name });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-20">
        <div className="text-center p-10 bg-gray-800 rounded-lg shadow-2xl border border-amber-400">
          <h2 className="text-4xl font-bold text-amber-300 mb-4">Спасибо за вашу заявку!</h2>
          <p className="text-lg text-gray-200">Мы свяжемся с вами в ближайшее время.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-24 pt-32 bg-gray-900">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-4 px-8 sm:px-0">
           <button
             onClick={() => navigateTo(Page.About)}
             className="flex items-center space-x-2 text-gray-400 hover:text-amber-300 transition-colors duration-300 group"
             aria-label="Назад к преимуществам"
           >
             <ArrowLeftIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
             <span>Назад к преимуществам</span>
           </button>
         </div>
        <div className="p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-amber-300">Заявка на работу</h2>
            <p className="mt-2 text-gray-400">Заполните форму, и мы свяжемся с вами</p>
          </div>
          <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="form-name" value="contact" />
            <FormInput name="name" label="Имя" value={formData.name} onChange={handleChange} error={errors.name} />
            <FormInput name="age" type="number" label="Возраст" value={formData.age} onChange={handleChange} error={errors.age} />
            <FormInput name="city" label="Город" value={formData.city} onChange={handleChange} error={errors.city} />
            <FormInput name="phone" label="Номер телефона" placeholder="+380XXXXXXXXX" value={formData.phone} onChange={handleChange} error={errors.phone} />
            <FormInput name="telegram" label="Телеграм (ник или ссылка)" value={formData.telegram} onChange={handleChange} />
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Фотография <span className="text-gray-400">(не обязательно)</span></label>
              <input name="photo" type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-400 file:text-gray-900 hover:file:bg-amber-300 transition-colors duration-200"/>
            </div>

            <div>
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-gray-900 bg-amber-400 hover:bg-amber-300 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-gray-800 transition-all duration-300"
              >
                Отправить заявку
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

interface FormInputProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: string;
    placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, label, error, ...rest }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300">{label}</label>
        <div className="mt-1">
            <input
                id={name}
                name={name}
                {...rest}
                className={`block w-full appearance-none rounded-md border px-3 py-2 text-white bg-gray-700 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm transition-colors duration-200 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-amber-400 focus:ring-amber-400'}`}
            />
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
);


const Footer = () => {
    return (
        <footer className="bg-black py-6">
            <div className="container mx-auto px-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} {SALON_NAME}. Все права защищены.</p>
            </div>
        </footer>
    );
};
