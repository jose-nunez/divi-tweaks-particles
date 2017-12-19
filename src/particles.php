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

		$this->suppported_class = 'divi-tweak-particles';
		/*$this->suppported_shortcodes = array(
			'et_pb_section',
			'et_pb_row',
			'et_pb_column',
			'et_pb_slider','et_pb_accordion',
		);*/
	}

	// MAIN PLUGIN HOOKS _______________________________________________
	
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
			add_action('wp_enqueue_scripts', array($this,'enqueue_resources'));
		}
	}
	

	// INTERNAL FUNCTIONS _______________________________________________


	public function shortcode($atts, $content=null, $code=""){
		return 'Particles desde WIC sstm!';
	}

	public function enqueue_resources(){
		if ( $this->should_enqueue() ) {
			$this->enqueue_styles();
			$this->enqueue_scripts();
		}
	}

	private function should_enqueue(){
		return false
			|| $this->has_suppported_shortcode()
			|| $this->is_class_present()
			|| $this->is_active_header()
		;
	}
	private function has_suppported_shortcode(){
		// ALL SUPPORTED SO FAR!!!!!!!!!!!!!
		return true;
		/*global $post;
		if(!($isPost = is_a( $post, 'WP_Post' ))) return;
		$resp = false;
		foreach ($this->suppported_shortcodes as $key => $shortcode) {
			$resp = $resp || has_shortcode( $post->post_content, $shortcode);
		}
		return $resp;*/
	}
	private function is_class_present(){
		global $post;
		if(!($isPost = is_a( $post, 'WP_Post' ))) return;
		return (is_numeric(strpos($post->post_content,$this->suppported_class)));
	}

	private function is_active_header(){
		return true; // CHANGE USING SETTINGS
	}

	private function enqueue_styles() { 
		$plugin_url = plugin_dir_url( __FILE__ ); 
		wp_enqueue_style( 'wc_particles_style', $plugin_url . 'css/style.css' ); 
	}
	private function enqueue_scripts() { 
		wp_enqueue_script( 'particles', plugin_dir_url( __FILE__ ) . 'lib/particles.min.js',array(),false,true);
		wp_enqueue_script( 'wc_particles_app', plugin_dir_url( __FILE__ ) . 'js/particles.min.js',array(),false,true);
		
		$app_vars = array(
			'active_header'=>$this->is_active_header(), 
		);
		wp_localize_script('wc_particles_app','app_vars',$app_vars);
	}
}

new ParticlesTweak();

?>