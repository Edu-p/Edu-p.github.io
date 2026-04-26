<template>
  <aside
    class="reveal reveal-3 relative min-h-[703px] contain-[layout_paint] max-[1180px]:min-h-[560px] max-[720px]:min-h-[420px]"
    aria-label="Visual de inteligencia artificial"
  >
    <div
      class="orbital-shell absolute right-0 bottom-0 grid aspect-square w-[min(100%,740px)] place-items-center max-[1180px]:relative max-[1180px]:mx-auto"
    >
      <div class="relative z-[3] aspect-[0.88] w-[min(82%,610px)] self-end">
        <div class="absolute bottom-0 overflow-hidden">
          <img class="size-full object-cover object-top" :src="avatarUrl" alt="Eduardo A. A." />
        </div>
      </div>

      <div class="orbit orbit-a"></div>
      <div class="orbit orbit-b"></div>
      <div class="orbit orbit-c"></div>

      <span class="orbit-point top-[14%] left-[20%]"></span>
      <span class="orbit-point top-[22%] right-[17%] [animation-delay:300ms]"></span>
      <span class="orbit-point top-[48%] left-[12%] [animation-delay:620ms]"></span>
      <span class="orbit-point top-[72%] right-[23%] [animation-delay:920ms]"></span>
      <span class="orbit-point top-[84%] left-[36%] [animation-delay:1220ms]"></span>

      <span
        :class="[
          pillClass,
          'left-[17px] top-[270px] [animation-delay:0ms] min-[1180px]:max-[1280px]:left-[47px] min-[1180px]:max-[1280px]:top-[400px] max-[1180px]:left-[18px] max-[1180px]:top-[200px]',
        ]"
        @pointermove="tiltPill"
        @pointerleave="resetPill"
      >
        <UiIcon name="multi_agents" size="sm" />
        <span>Multi-Agent Systems</span>
      </span>
      <span
        :class="[
          pillClass,
          'right-[78px] top-[71px] [animation-delay:420ms] min-[1180px]:max-[1280px]:right-[39px] min-[1180px]:max-[1280px]:top-[144px]',
        ]"
        @pointermove="tiltPill"
        @pointerleave="resetPill"
      >
        <UiIcon name="mlops" size="sm" />
        <span>MLOps</span>
      </span>
      <span
        :class="[
          pillClass,
          'right-2.5 top-[323px] [animation-delay:760ms] min-[1180px]:max-[1280px]:right-[38px] min-[1180px]:max-[1280px]:top-[324px] max-[1180px]:right-[42px] max-[1180px]:top-[270px]',
        ]"
        @pointermove="tiltPill"
        @pointerleave="resetPill"
      >
        <UiIcon name="machine_learning" size="sm" />
        <span>Machine Learning</span>
      </span>
      <span
        :class="[
          pillClass,
          'bottom-[210px] left-1.5 [animation-delay:1080ms] min-[1180px]:max-[1280px]:bottom-[184px] min-[1180px]:max-[1280px]:left-[34px]',
        ]"
        @pointermove="tiltPill"
        @pointerleave="resetPill"
      >
        <UiIcon name="cloud" size="sm" />
        <span>Cloud</span>
      </span>
      <span
        :class="[
          pillClass,
          'right-[239px] bottom-24 [animation-delay:1440ms] min-[1180px]:max-[1280px]:right-[319px] min-[1180px]:max-[1280px]:bottom-[394px]',
        ]"
        @pointermove="tiltPill"
        @pointerleave="resetPill"
      >
        <UiIcon name="star" size="sm" />
        <span>Generative AI</span>
      </span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import avatarUrl from '@/assets/avatar.png'
import UiIcon from '@/components/ui/UiIcon.vue'

const pillClass =
  'absolute z-[6] inline-flex min-h-[52px] items-center gap-2 rounded-[14px] border border-[color-mix(in_srgb,var(--color-ice)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-ink)_74%,transparent)] px-[18px] text-base text-[color-mix(in_srgb,var(--color-ice)_90%,transparent)] shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-electric)_10%,transparent)_inset,0_0_24px_color-mix(in_srgb,var(--color-electric)_10%,transparent)] backdrop-blur-[8px] transform-3d transition-[transform,box-shadow] duration-200 will-change-[transform,box-shadow] animate-[pill-float_3800ms_ease-in-out_infinite] [transform:perspective(920px)_translateY(0)_rotateX(var(--pill-rx,0deg))_rotateY(var(--pill-ry,0deg))] hover:scale-110 hover:shadow-[0_18px_36px_color-mix(in_srgb,black_40%,transparent),0_0_0_1px_color-mix(in_srgb,var(--color-electric)_28%,transparent)_inset,0_0_28px_color-mix(in_srgb,var(--color-electric)_20%,transparent)] hover:[transform:perspective(920px)_translateY(-2px)_scale(1.1)_rotateX(calc(var(--pill-rx,0deg)*1.35))_rotateY(calc(var(--pill-ry,0deg)*1.35))] [&_.ui-icon]:text-[var(--color-electric)] max-[1180px]:min-h-11 max-[1180px]:text-[0.86rem] max-[720px]:hidden'

function tiltPill(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const offsetX = (event.clientX - rect.left) / rect.width - 0.5
  const offsetY = (event.clientY - rect.top) / rect.height - 0.5
  target.style.setProperty('--pill-rx', `${(-offsetY * 10).toFixed(2)}deg`)
  target.style.setProperty('--pill-ry', `${(offsetX * 10).toFixed(2)}deg`)
}

function resetPill(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement
  target.style.setProperty('--pill-rx', '0deg')
  target.style.setProperty('--pill-ry', '0deg')
}
</script>

<style scoped>
.orbital-shell::before {
  position: absolute;
  width: min(70%, 420px);
  aspect-ratio: 1;
  content: '';
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--color-electric) 36%, transparent),
    transparent 72%
  );
  filter: blur(8px);
}

.orbit {
  position: absolute;
  border: 1px solid color-mix(in srgb, var(--color-electric) 26%, transparent);
  border-radius: 50%;
}

.orbit-a {
  width: 86%;
  aspect-ratio: 1;
  animation: orbit-spin 18s linear infinite;
}

.orbit-b {
  width: 74%;
  aspect-ratio: 1;
  animation: orbit-spin 24s linear infinite reverse;
}

.orbit-c {
  width: 62%;
  aspect-ratio: 1;
  opacity: 0.78;
  animation: orbit-spin 30s linear infinite;
}

.orbit::after {
  position: absolute;
  top: 8%;
  left: 50%;
  width: 8px;
  height: 8px;
  content: '';
  border-radius: 50%;
  background: var(--color-electric);
  box-shadow: 0 0 18px color-mix(in srgb, var(--color-electric) 72%, transparent);
}

.orbit-a::after {
  animation: twinkle 1800ms ease-in-out infinite;
}

.orbit-b::after {
  animation: twinkle 1500ms ease-in-out infinite 320ms;
}

.orbit-c::after {
  animation: twinkle 1700ms ease-in-out infinite 680ms;
}

.orbit-point {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-electric) 80%, white);
  box-shadow: 0 0 12px color-mix(in srgb, var(--color-electric) 80%, transparent);
  animation: twinkle 1800ms ease-in-out infinite;
}

@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pill-float {
  0%,
  100% {
    translate: 0 0;
  }

  50% {
    translate: 0 -8px;
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.34;
    scale: 0.84;
  }

  50% {
    opacity: 1;
    scale: 1.2;
  }
}
</style>
