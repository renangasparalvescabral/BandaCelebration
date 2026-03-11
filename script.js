// When the user scrolls down 20px from the top of the document, slide down the navbar
// When the user scrolls to the top of the page, slide up the navbar (50px out of the top view)
window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  var btnTopo = document.querySelector(".btn-topo");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
    btnTopo.style.display = "block";
  } else {
    document.getElementById("navbar").style.top = "-90px";
    btnTopo.style.display = "none";
  }
}

//..........................................................//


function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.body.style.overflow = "hidden";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.body.style.overflow = "";
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeNav();
  }
  if (e.key === "ArrowLeft") {
    carrosselTwitch.anterior();
  }
  if (e.key === "ArrowRight") {
    carrosselTwitch.proximo();
  }
});

//.........................................................//

// Carrossel estilo Twitch
var carrosselTwitch = {
  indice: 0,
  total: 0,
  track: null,
  slides: null,
  dots: null,
  touchStartX: 0,
  touchEndX: 0,

  init: function() {
    this.track = document.querySelector(".carrossel-track");
    this.slides = document.querySelectorAll(".carrossel-slide");
    this.dots = document.querySelectorAll(".carrossel-dot");
    this.total = this.slides.length;
    if (!this.track || this.total === 0) return;

    // Botões prev/next
    var self = this;
    document.querySelector(".carrossel-prev").addEventListener("click", function() {
      self.anterior();
    });
    document.querySelector(".carrossel-next").addEventListener("click", function() {
      self.proximo();
    });

    // Dots clicáveis
    this.dots.forEach(function(dot, i) {
      dot.addEventListener("click", function() {
        self.irPara(i);
      });
    });

    // Touch/swipe
    var container = document.querySelector(".carrossel-twitch");
    container.addEventListener("touchstart", function(e) {
      self.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    container.addEventListener("touchend", function(e) {
      self.touchEndX = e.changedTouches[0].screenX;
      self.handleSwipe();
    }, { passive: true });

    // Inicializar no primeiro slide
    this.irPara(0);
  },

  irPara: function(index) {
    // Loop circular
    if (index < 0) index = this.total - 1;
    if (index >= this.total) index = 0;
    this.indice = index;

    // Calcular translateX para centralizar o slide ativo
    var slideWidthPercent = this.getSlideWidthPercent();
    var offset = -(index * slideWidthPercent) + (50 - slideWidthPercent / 2);
    this.track.style.transform = "translateX(" + offset + "%)";

    // Atualizar classes nos slides
    var self = this;
    this.slides.forEach(function(slide, i) {
      slide.classList.remove("ativo");
      if (i === self.indice) {
        slide.classList.add("ativo");
      }
    });

    // Atualizar dots
    this.dots.forEach(function(dot, i) {
      dot.classList.remove("ativo");
      if (i === self.indice) {
        dot.classList.add("ativo");
      }
    });

    // Lazy loading e auto-pause
    this.gerenciarVideos();
  },

  getSlideWidthPercent: function() {
    var w = window.innerWidth;
    if (w <= 480) return 90;
    if (w <= 768) return 80;
    return 60;
  },

  proximo: function() {
    this.irPara(this.indice + 1);
  },

  anterior: function() {
    this.irPara(this.indice - 1);
  },

  handleSwipe: function() {
    var diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) {
      this.proximo();
    } else {
      this.anterior();
    }
  },

  gerenciarVideos: function() {
    var self = this;
    this.slides.forEach(function(slide, i) {
      var video = slide.querySelector("video");
      if (!video) return;

      var distancia = Math.abs(i - self.indice);
      var distanciaCircular = Math.abs(i - self.indice + self.total) % self.total;
      distancia = Math.min(distancia, distanciaCircular);

      if (distancia <= 1) {
        if (!video.getAttribute("src") && video.dataset.src) {
          video.src = video.dataset.src;
          video.preload = "metadata";
        }
      }

      if (i !== self.indice) {
        video.pause();
      }
    });
  }
};

carrosselTwitch.init();

// Recalcular posição ao redimensionar
window.addEventListener("resize", function() {
  carrosselTwitch.irPara(carrosselTwitch.indice);
});

// Fechar overlay ao clicar na área escura
document.getElementById("myNav").addEventListener("click", function(e) {
  if (e.target === this) {
    closeNav();
  }
});

// Animação fade-in ao rolar
var fadeElements = document.querySelectorAll(".fade-in");
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

fadeElements.forEach(function(el) {
  observer.observe(el);
});

// Scroll spy — destaca link ativo no navbar
var sections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll(".linksEsq a, .linksDir a");

var spyObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var id = entry.target.getAttribute("id");
      navLinks.forEach(function(link) {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === "#" + id) {
          link.classList.add("active-link");
        }
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(function(section) {
  spyObserver.observe(section);
});
