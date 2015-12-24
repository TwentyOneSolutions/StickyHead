# StickyHead
A modern jQuery plugin for keeping HTML table headers in view while scrolling, based on a CodePen by @jgx http://codepen.io/jgx/pen/wiIGc/

I've used other similar plugins before, but they did not play well with hidden tables, e.g. tables that were wrapped within collapsed elements, so the sticky header of a hidden table was always still visible.  This plugin handles that case properly by checking whether the table is visible.

To use, simply call the plugin on the target tables, e.g.

    // include jquery
    // include jquery.stickyhead.js
    
    $(function(){
    
      $(".sticy-head").stickyHead();
    });

The plugin registers event handlers for window scroll and resize, so to trigger a "refresh" you can simply fire the scroll event, e.g.

    $(window).scroll();
    

Be sure to wrap your table header with <thead> and call the plugin on the table, e.g.

    <table class="sticky-head">
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column N</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
          <td>Data N</td>
        </tr>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
          <td>Data N</td>
        </tr>
        ...
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
          <td>Data N</td>
        </tr>
      </tbody>
    </table>
