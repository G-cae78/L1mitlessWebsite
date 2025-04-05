<template>
  <div class="product-detail-page">
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
          productId: "prod_S26fyB25tyKpD1",
          name: 'Become L"1"mitless Club Tee',
          description: 'A sleek and stylish tee to represent the LIMITLESS lifestyle.',
          price: 25.99,
          image: require('@/assets/Front.png'),
          images: [
            require('@/assets/Front.png'),
            require('@/assets/shirtBack.png'),
            require('@/assets/Folded.png'),
          ],
          sizes: ['S', 'M', 'L', 'XL'],
          additionalInfo: '100% cotton, machine washable, slim fit design',
        },
        {
          productId: "prod_S26c3i7MqPJkfG",
          name: 'L1MITLESS Trucker Cap',
          description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
          price: 25.99,
          image: require('@/assets/Cap2.png'),
          images: [require('@/assets/Cap2.png')],
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