$(document).ready(function(){
  $(".like_action.inactive").live('tap click', function(evt){
    evt.preventDefault();
    var link = $(this);

    $.ajax({
      url: link.attr("href"),
      dataType: 'json',
      type: 'POST',
      beforeSend: function(){
        link.removeClass('inactive')
              .addClass('loading');
      },
      complete: function(data){
        link.removeClass('loading')
              .removeClass('inactive')
              .addClass('active')
              .data('post-id', postId);
      }
    });
  });

  $(".like_action.active").live('tap click', function(evt){
    evt.preventDefault();
    var link = $(this);

    $.ajax({
      url: link.attr("href"),
      dataType: 'json',
      type: 'DELETE',
      beforeSend: function(){
        link.removeClass('active')
              .addClass('loading');
      },
      complete: function(data){
        link.removeClass('loading')
              .removeClass('active')
              .addClass('inactive')
              .data('like-id', '');
      }
    });
  });

  $("a.show_comments").live('tap click', function(evt){
    evt.preventDefault();
    var link = $(this),
        parent = link.closest(".bottom_bar").first(),
        commentsContainer = parent.find(".comments");

    if( link.hasClass('active') ) {
      commentsContainer.first().hide();
      link.removeClass('active');

    } else if( commentsContainer.length > 0 ) {
      commentsContainer.first().show();
      link.addClass('active');

    } else {
      $.ajax({
        url: link.attr('href'),
        success: function(data){
          parent.append(data);
          link.addClass('active');
        }
      });
    }
  });

  $("a.comment_action").live('tap click', function(evt){
    evt.preventDefault();
    var link = $(this);

    if(link.hasClass('inactive')) {
      var parent = link.closest(".bottom_bar").first(),
          container = link.closest('.bottom_bar').find('.add_comment_bottom_link_container');

      $.ajax({
        url: link.attr('href'),
        beforeSend: function(){
          link.addClass('loading');
        },
        success: function(data){
          link.removeClass('loading')
              .removeClass('inactive');

          container.first().hide();

          parent.append(data);
          parent.find('textarea').first().focus();
        }
      });
    }
  });

  $("a.cancel_new_comment").live('tap click', function(evt){
    evt.preventDefault();
    var link = $(this);
        form = link.closest("form"),
        commentActionLink = link.closest(".bottom_bar").find("a.comment_action").first();
        container = link.closest('.bottom_bar').find('.add_comment_bottom_link_container');

    if(container.length > 0 ){
      container.first().show();
    }

    commentActionLink.addClass("inactive");
    form.remove();
  });
});
