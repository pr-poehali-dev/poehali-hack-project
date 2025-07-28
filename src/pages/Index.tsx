import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface StarPackage {
  id: number;
  name: string;
  stars: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  popular?: boolean;
  image: string;
  description: string;
}

const starPackages: StarPackage[] = [
  {
    id: 1,
    name: "Стартовый",
    stars: 100,
    price: 150,
    originalPrice: 200,
    discount: 25,
    image: "/img/a71bd836-0fa9-426f-b53e-1ec9f39cd581.jpg",
    description: "Идеально для начинающих"
  },
  {
    id: 2,
    name: "Популярный",
    stars: 500,
    price: 650,
    originalPrice: 900,
    discount: 28,
    popular: true,
    image: "/img/1e601c17-90a9-4075-bf28-2990021b803f.jpg",
    description: "Лучшее соотношение цена/качество"
  },
  {
    id: 3,
    name: "Премиум",
    stars: 1000,
    price: 1200,
    originalPrice: 1800,
    discount: 33,
    image: "/img/e193460d-a4ec-4784-8f6d-fa44159a167b.jpg",
    description: "Максимальная выгода"
  },
  {
    id: 4,
    name: "Мини",
    stars: 50,
    price: 80,
    image: "/img/a71bd836-0fa9-426f-b53e-1ec9f39cd581.jpg",
    description: "Попробовать звёзды"
  },
  {
    id: 5,
    name: "Мега",
    stars: 2500,
    price: 2800,
    originalPrice: 4500,
    discount: 38,
    image: "/img/1e601c17-90a9-4075-bf28-2990021b803f.jpg",
    description: "Для серьёзных проектов"
  }
];

const Index = () => {
  const [selectedPackage, setSelectedPackage] = useState<StarPackage | null>(null);
  const [orderForm, setOrderForm] = useState({
    username: "",
    email: "",
    telegramId: "",
    paymentMethod: "",
    notes: ""
  });
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Заказ оформлен! Пакет: ${selectedPackage?.name}, Звёзд: ${selectedPackage?.stars}, Цена: ${selectedPackage?.price}₽`);
    setIsOrderOpen(false);
    setOrderForm({ username: "", email: "", telegramId: "", paymentMethod: "", notes: "" });
  };

  const openOrderDialog = (pkg: StarPackage) => {
    setSelectedPackage(pkg);
    setIsOrderOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="text-5xl">⭐</div>
            <h1 className="text-4xl font-bold text-primary">
              Telegram Stars
            </h1>
            <div className="text-5xl">⭐</div>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Купить звёзды Telegram по самым низким ценам
          </p>
          <p className="text-lg text-primary font-semibold">
            💫 Моментальная доставка • 🔒 Безопасно • 💰 Лучшие цены
          </p>
        </header>

        <div className="mb-12 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">🚀 Зачем нужны звёзды Telegram?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎁</div>
                  <h3 className="font-semibold mb-2">Подарки в каналах</h3>
                  <p className="text-sm opacity-90">Отправляйте подарки подписчикам</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💎</div>
                  <h3 className="font-semibold mb-2">Премиум функции</h3>
                  <p className="text-sm opacity-90">Доступ к эксклюзивному контенту</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <h3 className="font-semibold mb-2">Поддержка авторов</h3>
                  <p className="text-sm opacity-90">Благодарите за качественный контент</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-8">📦 Выберите пакет звёзд</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {starPackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`relative group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  pkg.popular ? 'ring-2 ring-primary ring-offset-2' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      🔥 ПОПУЛЯРНЫЙ
                    </Badge>
                  </div>
                )}
                
                {pkg.discount && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive" className="font-bold">
                      -{pkg.discount}%
                    </Badge>
                  </div>
                )}

                <div className="p-2">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                </div>

                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">⭐ {pkg.stars.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>

                <CardContent className="text-center">
                  <div className="mb-4">
                    {pkg.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        {pkg.originalPrice}₽
                      </div>
                    )}
                    <div className="text-2xl font-bold text-primary">
                      {pkg.price}₽
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {(pkg.price / pkg.stars).toFixed(2)}₽ за звезду
                    </div>
                  </div>

                  <Button 
                    onClick={() => openOrderDialog(pkg)}
                    className="w-full group-hover:scale-105 transition-transform"
                    size="lg"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Купить сейчас
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-bold text-lg mb-2">Моментальная доставка</h3>
            <p className="text-muted-foreground">Звёзды поступят на ваш аккаунт в течение 5 минут</p>
          </Card>
          <Card className="text-center p-6">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="font-bold text-lg mb-2">Полная безопасность</h3>
            <p className="text-muted-foreground">Официальные методы, без риска блокировки</p>
          </Card>
          <Card className="text-center p-6">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="font-bold text-lg mb-2">Лучшие цены</h3>
            <p className="text-muted-foreground">Самые выгодные тарифы на рынке</p>
          </Card>
        </div>

        <Dialog open={isOrderOpen} onOpenChange={setIsOrderOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon name="Star" size={20} />
                Оформление заказа
              </DialogTitle>
            </DialogHeader>
            
            {selectedPackage && (
              <div className="space-y-4">
                <div className="bg-secondary p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{selectedPackage.name}</span>
                    <Badge>⭐ {selectedPackage.stars}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-primary mt-2">
                    {selectedPackage.price}₽
                  </div>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Имя пользователя Telegram *</Label>
                    <Input
                      id="username"
                      value={orderForm.username}
                      onChange={(e) => setOrderForm({...orderForm, username: e.target.value})}
                      placeholder="@username"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="telegramId">ID Telegram (необязательно)</Label>
                    <Input
                      id="telegramId"
                      value={orderForm.telegramId}
                      onChange={(e) => setOrderForm({...orderForm, telegramId: e.target.value})}
                      placeholder="123456789"
                    />
                  </div>

                  <div>
                    <Label>Способ оплаты *</Label>
                    <Select 
                      value={orderForm.paymentMethod} 
                      onValueChange={(value) => setOrderForm({...orderForm, paymentMethod: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите способ оплаты" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">💳 Банковская карта</SelectItem>
                        <SelectItem value="qiwi">🥝 QIWI</SelectItem>
                        <SelectItem value="yoomoney">💰 ЮMoney</SelectItem>
                        <SelectItem value="crypto">₿ Криптовалюта</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Дополнительные пожелания</Label>
                    <Textarea
                      id="notes"
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                      placeholder="Укажите особые пожелания..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="CreditCard" size={16} className="mr-2" />
                    Оплатить {selectedPackage.price}₽
                  </Button>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;