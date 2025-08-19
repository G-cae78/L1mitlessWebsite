<template>
  <div class="product-detail-page">
    <!-- Coming Soon Banner -->
    <!-- <div class="coming-soon-banner">
      <div class="banner-text">COMING SOON</div>
    </div> -->
    
    <div v-if="product" class="product-content">
      <!-- Back Button -->
      <button @click="$router.back()" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Merchandise
      </button>
      
      <!-- Product Content Grid -->
      <div class="product-grid">
        <!-- Image Gallery -->
        <div class="product-gallery" @touchstart="handleTouchStart" @touchmove="handleTouchMove">
          <div class="main-image-container">
            <img :src="mainImage" :alt="product.name" class="main-image" />
            <!-- Navigation Arrows -->
            <button class="nav-arrow prev" @click="prevImage" v-if="productImages.length > 1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button class="nav-arrow next" @click="nextImage" v-if="productImages.length > 1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <!-- Image Counter -->
            <div class="image-counter" v-if="productImages.length > 1">
              {{ currentImageIndex + 1 }} / {{ productImages.length }}
            </div>
          </div>
          <div class="thumbnail-container">
            <div 
              v-for="(image, index) in productImages" 
              :key="index" 
              @click="changeMainImage(image)"
              class="thumbnail-wrapper"
              :class="{ active: mainImage === image }"
            >
              <img :src="image" class="thumbnail" />
            </div>
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="product-info">
          <div class="product-header">
            <h1>{{ product.name }}</h1>
            <p class="price">€{{ product.price.toFixed(2) }}</p>
          </div>
          
          <p class="description">{{ product.description }}</p>
          
          <div class="product-actions">
            <div class="size-selector" v-if="product.sizes">
              <label for="size-select">Size:</label>
              <select 
                id="size-select"
                v-model="selectedSize" 
                class="size-select"
              >
                <option v-for="size in product.sizes" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
            </div>
            
            <button @click="addToCart" class="add-to-cart-button">
              Add to Cart
            </button> 
           
          </div>
          
          <div class="additional-info" v-if="product.additionalInfo">
            <h3>Product Details</h3>
            <p>{{ product.additionalInfo }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

interface Product {
  productId: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  sizes: string[];
  additionalInfo?: string;
  isMerchandise: boolean;
}

export default defineComponent({
  name: 'ProductDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const productId = route.params.id as string;

    return {
      route,
      router,
      store,
      productId,
    };
  },
  data() {
    return {
      products: [
        {
          isMerchandise: true,
          productId: "prod_S26fyB25tyKpD1",
          name: 'Become L1MITLESS Club Tee',
          description: 'A sleek and stylish tee to represent the LIMITLESS lifestyle.',
          price: 28.99,
          image: require('@/assets/Front.png'),
          images: [
            require('@/assets/Front.png'),
            require('@/assets/shirtBack.png'),
            require('@/assets/Folded.png'),
          ],
          sizes: ['S', 'M', 'L', 'XL'],
          additionalInfo: `: Made with medium fabric (5.3 oz/yd² (180 g/m²)) consisting of 100% cotton for year-round comfort that is sustainable and highly durable. 
.: The classic fit of this shirt ensures a comfy, relaxed wear while the crew neckline adds that neat, timeless look that can blend into any occasion, casual or semi-formal.
.: The tear-away label means a scratch-free experience with no irritation or discomfort whatsoever.
.: Made using 100% US cotton that is ethically grown and harvested. Gildan is also a proud member of the US Cotton Trust Protocol ensuring ethical and sustainable means of production. This blank tee is certified by Oeko-Tex for safety and quality assurance.`,
        },
        {
          isMerchandise: true,
          productId: "prod_SKU5WOYc3QYGLv",
          name: 'L1MITLESS Session Trucker',
          description: '“Love at First Set” Cap — For those who fall hard... for their gym reps and running miles. Warning: May cause spontaneous flexing and random bursts of energy!',
          price: 35.99,
          image: require('@/assets/LoveAtFirstSet.png'),
          images: [
            require('@/assets/LoveAtFirstSet.png'),
            require('@/assets/L1mitlessLogoHatPurpleBottom.png'),
          ],
          sizes: ['One Size'],
          additionalInfo: 'Adjustable strap, 100% cotton',
        },
        {
          isMerchandise: true,
          productId: "prod_SEUjEtXcDyN3CW",
          name: "L1MITLESS Athletic Vest",
          description: 'L1mitless Hybrid Vest, perfect for hitting workouts and casual wear.',
          price: 26.99,
          image: require('@/assets/frontvest.png'),
          images: [
            require('@/assets/frontvest.png'),
            require('@/assets/BackVest.png'),
            require('@/assets/L1mitlessClothingModel.png')
          ],
          sizes: ['S', 'M', 'L', 'XL'],
          additionalInfo: `Product features
- Solid colors are 100% cotton, heather colors are a blend of cotton and viscose
- Cut-off sleeves boast a trendy raw edge for a modern look
- Ribbed knit collar retains shape while offering elasticity
- Made from 100% combed ringspun cotton for softness and comfort
- Lightweight fabric perfect for warm weather (4.4 oz/yd²)

Care instructions
- Machine wash: warm (max 40C or 105F)
- Non-chlorine: bleach as needed
- Tumble dry: medium
- Iron, steam or dry: low heat
- Do not dryclean`,
        
        },
        {
          isMerchandise: true,
          productId: "prod_SEUciupfgBFNIc",
          name: "L1MITLESS Inspire Club Tee",
          description: 'Inspire the LIMITLESS lifestyle.',
          price: 26.99,
          image: require('@/assets/FrontInspire.jpg'),
          images: [
            require('@/assets/FrontInspire.jpg'),
            require('@/assets/BackInspire.jpg'),
            //require('@/assets/shirtDetail2.png')
          ],
          sizes: ['S', 'M', 'L', 'XL'],
          additionalInfo: `- Neck and shoulder tape for enhanced stability
- Durable double-needle sleeve and bottom hems
- Ribbed collar for a well-fitted look
- Soft & breathable 100% cotton composition
- Classic fit with a tear-away label

Care instructions
- Machine wash: cold (max 30C or 90F)
- Do not bleach
- Tumble dry: low heat
- Iron, steam or dry: low heat
- Do not dryclean`,
        
        },
        {
          isMerchandise: true,
          productId: "prod_S26c3i7MqPJkfG",
          name: "L1MITLESS Goldie Trucker",
          description: 'Gold laid back, winning on chill mode.',
          price: 29.99,
          image: require('@/assets/L1mitlessHat1.png'),
          images: [
            require('@/assets/L1mitlessHat1.png'),
            require('@/assets/L1mitlessHat1Side.png'),
            require('@/assets/L1mitlessHat1Bottom.png'),
            require('@/assets/L1mitlessHatModel.png')
          ],
          sizes: ['One Size'],
          additionalInfo: 'Adjustable strap, 100% cotton',
          
        },
        {
          isMerchandise: true,
          productId: "prod_S26eHCm3dhcXdr",
          name: 'L1MITLESS Trucker Cap',
          description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
          price: 25.99,
          image: require('@/assets/Cap3.png'),
          images: [
            require('@/assets/Cap3.png'),
            require('@/assets/L1mitlessHat1Side.png'),
            require('@/assets/L1mitlessHat1Bottom.png'),
            require('@/assets/L1mitlesshatModel2.png')
          ],
          sizes: ['One Size'],
          additionalInfo: 'Adjustable strap, 100% cotton',
        
        },
        {
          isMerchandise: true,
          productId: "prod_SKU1P30RE8Pztr",
          name: 'L1MITLESS Purple Sproose',
          description: '"Clean, calm, and ready for lift-off. The Purple Sproose keeps it simple but flies high.',
          price: 35.99,
          image: require('@/assets/L1mitlessLogoHatPurple.png'),
          images: [
            require('@/assets/L1mitlessLogoHatPurple.png'),
            require('@/assets/L1mitlessLogoHatPurpleBottom.png'),
          ],
          sizes: ['One Size'],
          additionalInfo: 'Adjustable strap, 100% cotton',
        },
      ] as Product[],
      product: null as Product | null,
      mainImage: '',
      selectedSize: '',
      touchStartX: 0,
      touchEndX: 0,
    };
  },
  computed: {
    productImages(): string[] {
      const product = this.product as Product | null;
      return product?.images || (product?.image ? [product.image] : []);
    },
    currentImageIndex(): number {
      return this.productImages.findIndex((img: string) => img === this.mainImage);
    },
  },
  created() {
    const productId = this.productId;
    this.product = this.products.find((p) => p.productId === productId) || null;

    if (this.product) {
      this.mainImage = this.product.image;
      this.selectedSize = this.product.sizes?.[0] || '';
    } else {
      this.router.push('/merchandise');
    }
  },
  methods: {
    changeMainImage(image: string): void {
      this.mainImage = image;
    },
    nextImage(): void {
      const currentIndex = this.currentImageIndex;
      const nextIndex = (currentIndex + 1) % this.productImages.length;
      this.mainImage = this.productImages[nextIndex];
    },
    prevImage(): void {
      const currentIndex = this.currentImageIndex;
      const prevIndex = (currentIndex - 1 + this.productImages.length) % this.productImages.length;
      this.mainImage = this.productImages[prevIndex];
    },
    handleTouchStart(e: TouchEvent): void {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    handleTouchMove(e: TouchEvent): void {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    },
    handleSwipe(): void {
      if (this.touchEndX < this.touchStartX - 50) {
        this.nextImage(); // Swipe left
      } else if (this.touchEndX > this.touchStartX + 50) {
        this.prevImage(); // Swipe right
      }
    },
    addToCart(): void {
      if (!this.product) return;

      this.store.commit('ADD_TO_CART', {
        isMerchandise: this.product.isMerchandise,
        productId: this.product.productId,
        name: this.product.name,
        price: this.product.price,
        image: this.mainImage,
        selectedSize: this.selectedSize,
        quantity: 1,
      });

      alert(`${this.product.name} added to cart!`);
    },
  },
});
</script>

<style scoped>
/* Base Styles */
.product-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
}

/* Coming Soon Banner */
.coming-soon-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ff3b30;
  color: white;
  text-align: center;
  padding: 12px 0;
  z-index: 1000;
  animation: slideInOut 3s infinite;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.banner-text {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  animation: pulse 1.5s infinite;
}

@keyframes slideInOut {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  15%, 85% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Back Button */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #4a5568;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  transition: all 0.2s ease;
}

.back-button:hover {
  color: #2d3748;
  transform: translateX(-2px);
}

/* Product Grid Layout */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

/* Product Gallery */
.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}

.main-image-container {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  border-radius: 0.25rem;
  display: block;
}

/* Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: all 0.2s ease;
}

.nav-arrow:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow svg {
  width: 20px;
  height: 20px;
}

.nav-arrow.prev {
  left: 10px;
}

.nav-arrow.next {
  right: 10px;
}

@media (max-width: 767px) {
  .nav-arrow {
    width: 36px;
    height: 36px;
  }
}

/* Image Counter */
.image-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Thumbnail Container */
.thumbnail-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.thumbnail-wrapper {
  width: 70px;
  height: 70px;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
  padding: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.thumbnail-wrapper:hover,
.thumbnail-wrapper.active {
  border-color: #4299e1;
}

.thumbnail-wrapper.active {
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.3);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.125rem;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  line-height: 1.2;
}

@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
  }
}

.price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.description {
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
}

/* Product Actions */
.product-actions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.size-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.size-selector label {
  font-weight: 500;
  color: #4a5568;
}

.size-select {
  width: 100%;
  max-width: 200px;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #4a5568;
  background-color: white;
  transition: border-color 0.2s ease;
}

.size-select:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.add-to-cart-button {
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  background-color: #1a202c;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-to-cart-button:hover {
  background-color: #2d3748;
  transform: translateY(-1px);
}

/* Additional Info */
.additional-info {
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
  margin-top: 1rem;
}

.additional-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.75rem;
}

.additional-info p {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}
</style>