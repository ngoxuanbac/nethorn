import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Award,
  Users,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div>
                <h1 className="text-xl font-bold text-amber-900">NETHORN</h1>
                <p className="text-xs text-amber-600">Mỹ Nghệ Cao Cấp</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#gioi-thieu"
                className="text-amber-800 hover:text-amber-600 font-medium"
              >
                Giới Thiệu
              </Link>
              <Link
                href="#san-pham"
                className="text-amber-800 hover:text-amber-600 font-medium"
              >
                Sản Phẩm
              </Link>
              <Link
                href="#uu-diem"
                className="text-amber-800 hover:text-amber-600 font-medium"
              >
                Ưu Điểm
              </Link>
              <Link
                href="#lien-he"
                className="text-amber-800 hover:text-amber-600 font-medium"
              >
                Liên Hệ
              </Link>
              <Link
                href="/ai"
                className="text-amber-800 hover:text-amber-600 font-medium flex items-center space-x-1"
              >
                Tư vấn AI <Sparkles className="h-5 w-5" />
              </Link>
            </nav>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Liên Hệ Ngay
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                  Thủ Công Truyền Thống
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-amber-900 leading-tight">
                  Đồ Sừng Thủ Công
                  <span className="block text-amber-600">Mỹ Nghệ Việt Nam</span>
                </h1>
                <p className="text-xl text-amber-700 leading-relaxed">
                  Khám phá công dụng và vẻ đẹp tinh tế của các sản phảm mát xa
                  từ sừng truyền thống. Mỗi sản phẩm là một tác phẩm nghệ thuật
                  độc đáo, được tạo ra bởi đôi bàn tay khéo léo của nghệ nhân
                  lành nghề.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8"
                >
                  Khám Phá Sản Phẩm
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-600 text-amber-600 hover:bg-amber-50"
                >
                  Tìm Hiểu Thêm
                </Button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-900">15+</div>
                  <div className="text-sm text-amber-600">Năm Kinh Nghiệm</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-900">500+</div>
                  <div className="text-sm text-amber-600">Sản Phẩm</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-900">100%</div>
                  <div className="text-sm text-amber-600">Thủ Công</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Đồ sừng thủ công mỹ nghệ"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="gioi-thieu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-amber-100 text-amber-800 mb-4">
              Về Chúng Tôi
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-amber-900 mb-6">
              Nghệ Thuật Chế Tác Sừng Truyền Thống
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Với hơn 15 năm kinh nghiệm trong nghề, chúng tôi tự hào là một
              trong những xưởng thủ công uy tín chuyên chế tác các sản phẩm từ
              sừng tự nhiên.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Chất Lượng Cao
                </h3>
                <p className="text-amber-700">
                  Sử dụng nguyên liệu sừng tự nhiên cao cấp, được tuyển chọn kỹ
                  lưỡng để đảm bảo chất lượng tốt nhất.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Nghệ Nhân Lành Nghề
                </h3>
                <p className="text-amber-700">
                  Đội ngũ nghệ nhân có nhiều năm kinh nghiệm, thành thạo các kỹ
                  thuật chế tác truyền thống.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Thiết Kế Độc Đáo
                </h3>
                <p className="text-amber-700">
                  Mỗi sản phẩm đều mang tính nghệ thuật cao, kết hợp giữa truyền
                  thống và hiện đại.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="san-pham"
        className="py-20 bg-gradient-to-b from-amber-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-amber-100 text-amber-800 mb-4">Sản Phẩm</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-amber-900 mb-6">
              Bộ Sưu Tập Đặc Biệt
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Khám phá những combo chăm sóc sức khỏe tinh xảo được chế tác từ
              sừng tự nhiên
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Ly Sừng Cao Cấp",
                description:
                  "Ly uống rượu truyền thống với họa tiết chạm khắc tinh xảo",
                price: "Từ 500.000đ",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Tượng Nghệ Thuật",
                description:
                  "Tượng trang trí với thiết kế độc đáo, mang ý nghĩa phong thủy",
                price: "Từ 1.200.000đ",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Đồ Trang Sức",
                description:
                  "Vòng tay, nhẫn từ sừng tự nhiên với thiết kế hiện đại",
                price: "Từ 300.000đ",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Đồ Dùng Văn Phòng",
                description:
                  "Bút ký, hộp đựng danh thiếp sang trọng cho doanh nhân",
                price: "Từ 800.000đ",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Đồ Thờ Cúng",
                description:
                  "Các vật dụng thờ cúng truyền thống với ý nghĩa tâm linh",
                price: "Từ 600.000đ",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Quà Tặng Cao Cấp",
                description: "Bộ quà tặng đặc biệt cho những dịp quan trọng",
                price: "Từ 1.500.000đ",
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-amber-200"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-amber-700 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-600">
                      {product.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      Xem Chi Tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="uu-diem" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-amber-100 text-amber-800 mb-4">Ưu Điểm</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-amber-900 mb-6">
              Tại Sao Chọn Chúng Tôi?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    Chất Lượng Đảm Bảo
                  </h3>
                  <p className="text-amber-700">
                    Cam kết sử dụng 100% nguyên liệu sừng tự nhiên, không pha
                    trộn hóa chất độc hại.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    Bảo Hành Trọn Đời
                  </h3>
                  <p className="text-amber-700">
                    Hỗ trợ bảo hành và bảo dưỡng sản phẩm trọn đời, đảm bảo độ
                    bền lâu dài.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    Tư Vấn Chuyên Nghiệp
                  </h3>
                  <p className="text-amber-700">
                    Đội ngũ tư vấn giàu kinh nghiệm, hỗ trợ khách hàng 24/7.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    Thiết Kế Theo Yêu Cầu
                  </h3>
                  <p className="text-amber-700">
                    Nhận đặt hàng theo yêu cầu riêng, tạo ra sản phẩm độc nhất
                    vô nhị.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Quy trình chế tác"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Năm Kinh Nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="lien-he"
        className="py-20 bg-gradient-to-b from-amber-50 to-amber-100"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-amber-600 text-white mb-4">Liên Hệ</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-amber-900 mb-6">
              Kết Nối Với Chúng Tôi
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Hãy liên hệ ngay để được tư vấn và báo giá chi tiết về các sản
              phẩm đồ sừng thủ công
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-amber-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Điện Thoại
              </h3>
              <p className="text-amber-700 mb-4">Gọi ngay để được tư vấn</p>
              <p className="text-lg font-semibold text-amber-600">
                0123 456 789
              </p>
            </Card>

            <Card className="text-center p-8 border-amber-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Email
              </h3>
              <p className="text-amber-700 mb-4">Gửi yêu cầu qua email</p>
              <p className="text-lg font-semibold text-amber-600">
                info@sungthucong.vn
              </p>
            </Card>

            <Card className="text-center p-8 border-amber-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Địa Chỉ
              </h3>
              <p className="text-amber-700 mb-4">Ghé thăm xưởng sản xuất</p>
              <p className="text-lg font-semibold text-amber-600">
                Hà Nội, Việt Nam
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-12"
            >
              Liên Hệ Báo Giá Ngay
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div>
                  <h3 className="text-xl font-bold">NETHORN</h3>
                  <p className="text-sm text-amber-200">Mỹ Nghệ Cao Cấp</p>
                </div>
              </div>
              <p className="text-amber-200">
                Chuyên chế tác các sản phẩm đồ sừng thủ công mỹ nghệ cao cấp với
                chất lượng tốt nhất.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Sản Phẩm</h4>
              <ul className="space-y-2 text-amber-200">
                <li>
                  <Link href="#" className="hover:text-white">
                    Ly Sừng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Tượng Nghệ Thuật
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Đồ Trang Sức
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Quà Tặng
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Dịch Vụ</h4>
              <ul className="space-y-2 text-amber-200">
                <li>
                  <Link href="#" className="hover:text-white">
                    Tư Vấn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Thiết Kế
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Bảo Hành
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Vận Chuyển
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Theo Dõi</h4>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="w-10 h-10 bg-amber-800 rounded-lg flex items-center justify-center hover:bg-amber-700"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-amber-800 rounded-lg flex items-center justify-center hover:bg-amber-700"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-amber-800 rounded-lg flex items-center justify-center hover:bg-amber-700"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-200">
            <p>&copy; 2024 Sừng Thủ Công Mỹ Nghệ. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
