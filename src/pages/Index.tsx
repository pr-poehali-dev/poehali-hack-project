import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  category: string;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Премиум модель",
    price: 2999,
    image: "/img/ded44480-b283-4c5d-9479-38f1048fab16.jpg",
    sizes: ["S", "M", "L", "XL"],
    category: "premium",
    inStock: true,
  },
  {
    id: 2,
    name: "Градиент модель",
    price: 2499,
    image: "/img/75ac3a8e-9521-4452-8cc2-b14ba78bc53f.jpg",
    sizes: ["M", "L", "XL", "XXL"],
    category: "gradient",
    inStock: true,
  },
  {
    id: 3,
    name: "Яркая модель",
    price: 1999,
    image: "/img/a4a93246-c2be-41eb-b96f-1d416a33fced.jpg",
    sizes: ["S", "M", "L"],
    category: "bright",
    inStock: false,
  },
];

const Index = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  const handleFilter = () => {
    let filtered = products;

    if (selectedSize) {
      filtered = filtered.filter(product => product.sizes.includes(selectedSize));
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showOnlyInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSelectedSize("");
    setSelectedCategory("");
    setPriceRange([0, 5000]);
    setSearchQuery("");
    setShowOnlyInStock(false);
    setFilteredProducts(products);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            🛍️ Интернет-магазин
          </h1>
          <p className="text-lg text-muted-foreground">
            Качественные товары с доставкой по всей России
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Filter" size={20} />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="search">Поиск</Label>
                  <Input
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Найти товар..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Размер</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Выберите размер" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все размеры</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="XXL">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Категория</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все категории</SelectItem>
                      <SelectItem value="premium">Премиум</SelectItem>
                      <SelectItem value="gradient">Градиент</SelectItem>
                      <SelectItem value="bright">Яркие</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Цена: {priceRange[0]} - {priceRange[1]} ₽</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    min={0}
                    step={100}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={showOnlyInStock}
                    onChange={(e) => setShowOnlyInStock(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="inStock">Только в наличии</Label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleFilter} className="flex-1">
                    <Icon name="Search" size={16} className="mr-2" />
                    Применить
                  </Button>
                  <Button onClick={resetFilters} variant="outline">
                    <Icon name="RotateCcw" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Каталог товаров ({filteredProducts.length})
              </h2>
              <Select defaultValue="price-asc">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="name">По названию</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Нет в наличии</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                    
                    <p className="text-2xl font-bold text-primary mb-3">
                      {product.price.toLocaleString()} ₽
                    </p>
                    
                    <div className="mb-4">
                      <Label className="text-sm font-medium">Размеры:</Label>
                      <div className="flex gap-2 mt-1">
                        {product.sizes.map((size) => (
                          <Badge key={size} variant="outline" className="text-xs">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        disabled={!product.inStock}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                      <Button variant="outline" size="icon">
                        <Icon name="Heart" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground mb-4">
                  Попробуйте изменить параметры поиска
                </p>
                <Button onClick={resetFilters}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;