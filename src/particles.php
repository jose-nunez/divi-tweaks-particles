<?php 
/*
	Particles Divi Tweak
	version: 1.0.0
	Divi Tweaks compatible: 1.0.0
*/

class ParticlesTweak{

	public function __construct() {
		$this->slug = 'particles';
		add_filter( 'wcdt_add_tweak',array($this,'add'), 10, 3 );
		add_action( 'wcdt_init_tweak',array($this,'init'), 10, 3 );
	}
	
	public function add($tweak_list) {
		$tweak_list[$this->slug] = array(
			'slug'=>$this->slug,
			'tite'=>'Particles Background',
			'description'=>'some weird backgounds',
		);
		return $tweak_list;	
	}

	public function init($tweak_active){
		if($tweak_active[$this->slug]){
			/* Here's all the magic!! */
			add_shortcode('particles_short',array($this,'shortcode'));
		}
	}
	
	public function shortcode($atts, $content=null, $code=""){
		return 'Particles desde Sydney!';
	}
}

/*function ds_wc_plugin_styles() { 
    $plugin_url = plugin_dir_url( __FILE__ ); 

    wp_enqueue_style( 'style', $plugin_url . 'switch-style.css' ); 
    
    wp_enqueue_style( 'wc_particles_style', $plugin_url . 'lib/style.css' ); 

}
function ds_wc_plugin_scripts() { 
    // wp_enqueue_script( 'wc_particles', plugin_dir_url( __FILE__ ) . 'lib/particles.min.js');
    wp_enqueue_script( 'wc_particles', plugin_dir_url( __FILE__ ) . 'lib/particles.js',array(),false,true);
    wp_enqueue_script( 'wc_particles_app', plugin_dir_url( __FILE__ ) . 'lib/app.js',array(),false,true);
}*/

$particles_tweak = new ParticlesTweak();

?>