<?php
/*
 Template Name: Portfolio Gallery
*/
?>

<?php get_header(); ?>

			<div id="content">

				<div id="inner-content" class="wrap cf">

						<div id="main" class="m-all t-all d-all cf" role="main">

							<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

							<article id="post-<?php the_ID(); ?>" <?php post_class( 'cf' ); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">
								<header class="article-header">

									<h1 class="page-title">Client Work</h1>
									
								</header>

								<section class="entry-content clearfix" itemprop="articleBody">
									<?php
										
										$args = array( 'post_type' => 'portfolio', 'posts_per_page' => 12, 'category_name' => 'client' );
										$loop = new WP_Query( $args );
										while ( $loop->have_posts() ) : $loop->the_post();
										
									?>
										<div class="portfolio-item">
										<a href="<?php the_permalink()?>">

									<?php
											
										$image = get_field('item_image');
										$thumb = $image['sizes'][ 'thumbnail' ];

									?>
										<img class="portfolio-thumb" src="<?php echo $thumb; ?>" alt="<?php echo $image['alt'];?>"/>
										<div class="portfolio-title"><?php the_title(); ?></div>
										</a>
										<div> <?php echo strip_tags ( get_the_term_list(get_the_ID(), 'portfolio_tag', ' ', ', '  ) ); ?> </div>
										</div>
									<?php
										endwhile;
										
									?>
								</section>
								
								<header class="article-header">
								<h1 class="page-title">Personal Work</h1>
								</header>

								<section class="entry-content clearfix" itemprop="articleBody">
									<?php
										
										$args = array( 'post_type' => 'portfolio', 'posts_per_page' => 12, 'category_name' => 'personal' );
										$loop = new WP_Query( $args );
										while ( $loop->have_posts() ) : $loop->the_post();
										
									?>
										<div class="portfolio-item">
										<a href="<?php the_permalink()?>">

									<?php
											
										$image = get_field('item_image');
										$thumb = $image['sizes'][ 'thumbnail' ];

									?>
										<img class="portfolio-thumb" src="<?php echo $thumb; ?>" alt="<?php echo $image['alt'];?>"/>
										<div class="portfolio-title"><?php the_title(); ?></div>
										</a>
										<div> <?php echo strip_tags ( get_the_term_list(get_the_ID(), 'portfolio_tag', ' ', ', '  ) ); ?> </div>
										</div>
									<?php
										endwhile;
										
									?>

								</section>

							</article>

							<?php endwhile; else : ?>

									<article id="post-not-found" class="hentry cf">
											<header class="article-header">
												<h1><?php _e( 'Oops, Post Not Found!', 'bonestheme' ); ?></h1>
										</header>
											<section class="entry-content">
												<p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'bonestheme' ); ?></p>
										</section>
										<footer class="article-footer">
												<p><?php _e( 'This is the error message in the page-custom.php template.', 'bonestheme' ); ?></p>
										</footer>
									</article>

							<?php endif; ?>

						</div>


				</div>

			</div>


<?php get_footer(); ?>
